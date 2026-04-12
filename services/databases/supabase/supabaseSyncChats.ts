
import { localDatabase } from '../watermelondb/database';
import Message from '../watermelondb/models/Message';
import { supabase } from './supabase_client';
import { useAuthStore } from './supabaseAuth';

export async function syncPendingMessages() {
    try {
        // 1. Get the current user ID directly from Supabase session
        const { userid } = useAuthStore.getState();
        if (!userid) {
            console.warn("[Sync] Cannot sync: No user is currently logged in.");
            return;
        }

        // 2. Fetch all unsynced messages using your static query method
        const messagesCollection = localDatabase.collections.get<Message>('messages');
        const pendingMessages = await messagesCollection
            .query(...Message.getUnsyncedMessages())
            .fetch();

        if (pendingMessages.length === 0) {
            console.log("[Sync] All messages are up to date.");
            return;
        }

        console.log(`[Sync] Attempting to sync ${pendingMessages.length} pending messages...`);

        // Array to hold messages that successfully synced and need their local status updated
        const messagesToMarkAsSynced: Message[] = [];

        // 3. Process each message sequentially
        for (const msg of pendingMessages) {
            // We need the chat title and ID, so we fetch the parent chat relation
            const chat = await msg.chat.fetch();

            if (!chat) {
                console.warn(`[Sync] Skipping message ${msg.id}: Parent chat not found.`);
                continue;
            }

            const payload = {
                chat_id: chat.id,
                role: msg.role,
                content: msg.content,
                evidence: msg.evidence || null,
                created_at: new Date().toISOString(),
            };

            const { error } = await supabase.rpc('append_chat_message', {
                p_chat_id: chat.id,
                p_user_id: userid,
                p_message: payload,
                p_title: chat.title,
            });

            if (error) {
                console.error(`[Sync] Failed to sync message ${msg.id}:`, error);
            } else {
                messagesToMarkAsSynced.push(
                    msg.prepareUpdate((m) => {
                        m.status = 'synced';
                    })
                );
            }
        }

        if (messagesToMarkAsSynced.length > 0) {
            await localDatabase.write(async () => {
                await localDatabase.batch(...messagesToMarkAsSynced);
            });
            console.log(`[Sync] Successfully synced and updated ${messagesToMarkAsSynced.length} messages.`);
        }

    } catch (error) {
        console.error("[Sync] Critical error during synchronization:", error);
    }
}
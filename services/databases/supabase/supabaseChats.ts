import { EvidenceType } from "@/shared/types/evidence";
import { supabase } from "./supabase_client";
import { useAuthStore } from "./supabaseAuth";

// Updated Interface: changed created_at and removed status entirely
export interface RemoteMessagePayload {
    chat_id: string;
    role: string;
    content: string;
    evidence?: EvidenceType | null;
    created_at?: string;
    title?: string;
}

export const useRemoteChats = () => {
    const { userid } = useAuthStore();

    return {
        getAllChats: async () => {
            const { data, error } = await supabase.from('chats').select('*');
            if (error) throw error;
            return data;
        },

        getChatById: async (id: string) => {
            const { data, error } = await supabase.from('chats').select('*').eq('chat_id', id).single();
            if (error) throw error;
            return data;
        },

        deleteChat: async (id: string) => {
            const { error } = await supabase.from('chats').delete().eq('chat_id', id);
            if (error) throw error;
        },

        addMessage: async (message: RemoteMessagePayload): Promise<boolean> => {
            if (!userid) {
                console.error("No user logged in.");
                return false;
            }

            const messagePayload = {
                chat_id: message.chat_id,
                role: message.role,
                content: message.content,
                evidence: message.evidence || null,
                created_at: message.created_at || new Date().toISOString()
            };

            const { error } = await supabase.rpc('append_chat_message', {
                p_chat_id: message.chat_id,
                p_user_id: userid,
                p_message: messagePayload,
                p_title: message.title,
            });

            if (error) {
                console.error("Failed to sync message:", error);
                return false;
            }
            return true;
        },

        syncAllMessages: async (chat_id: string, messages: RemoteMessagePayload[]): Promise<boolean> => {
            // Note: The 'chats' table doesn't have a 'messages' JSONB column, 
            // messages are likely stored in a separate table via the RPC.
            // Until a dedicated RPC like 'update_chat_messages' or 'delete_chat_message'
            // is added to the backend, we gracefully skip remote sync for edits/deletes.
            console.warn("Remote sync for edits/deletes requires a dedicated Supabase RPC. Skipping for now to prevent schema errors.");
            return false;
        }
    };
};
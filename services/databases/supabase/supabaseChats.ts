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
        }
    };
};
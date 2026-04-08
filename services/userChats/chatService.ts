import { localDatabase } from '../databases/watermelondb/database';
import Chat from '../databases/watermelondb/models/Chat';

export const chatService = {
  /**
   * Processes a new message, creates a chat if none exists, and invokes the AI response.
   * @param messageText The user's message input.
   * @param currentChat The currently active Chat instance (if any).
   * @returns The active (or newly created) Chat instance.
   */
  async sendMessage(messageText: string, currentChat: Chat | null): Promise<Chat | null> {
    if (!messageText.trim()) return currentChat;

    let chat = currentChat;

    try {
      // 1. Create a new chat if we don't have an active one
      if (!chat) {
        chat = await localDatabase.write(async () => {
          return await localDatabase.collections.get<Chat>('chats').create(newChat => {
            newChat.title = messageText.trim().substring(0, 30) + (messageText.length > 30 ? '...' : '');
          });
        });
      }

      // 2. Add the user's message
      await chat.addMessage(true, messageText.trim());

      // 3. Trigger the AI Response Process
      // In a real application, you would invoke your Supabase Edge Function or local LLM here.
      // We simulate this entirely in the service layer for now.
      setTimeout(async () => {
        try {
          await chat!.addMessage(false, 'This is a simulated AI response orchestrated from the service layer.', 'mock_clip_id_123');
        } catch (error) {
          console.error('Failed to add simulated AI message:', error);
        }
      }, 1500);

      return chat;
    } catch (error) {
      console.error('Service Error - Failed to process message:', error);
      throw error;
    }
  },

  /**
   * Deletes a chat and its associated messages permanently.
   * @param chat The Chat instance to delete.
   */
  async deleteChat(chat: Chat): Promise<void> {
    try {
      await chat.markAsDeleted();
    } catch (error) {
      console.error('Service Error - Failed to delete chat:', error);
      throw error;
    }
  }
};

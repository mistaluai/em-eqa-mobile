import { EvidenceType } from "@/shared/types/evidence";
import { localDatabase } from '../databases/watermelondb/database';
import Chat from '../databases/watermelondb/models/Chat';

type RemoteChatService = {
  addMessage: (message: any) => Promise<boolean>;
  deleteChat: (id: string) => Promise<void>;
};

export const chatService = {
  /**
   * Processes a new user message, creates a chat if none exists, and syncs remotely.
   */
  async sendMessage(
    messageText: string,
    currentChat: Chat | null,
    remoteService: RemoteChatService // Inject the remote sync service here
  ): Promise<Chat | null> {

    if (!remoteService || typeof remoteService.addMessage !== 'function') {
      throw new Error("CRITICAL: remoteService is undefined or invalid. Did you forget to pass it from your component?");
    }

    if (!messageText.trim()) return currentChat;

    let chat = currentChat;

    try {
      // 1. Create a new chat locally if we don't have an active one
      if (!chat) {
        chat = await localDatabase.write(async () => {
          return await localDatabase.collections.get<Chat>('chats').create(newChat => {
            newChat.title = messageText.trim().substring(0, 30) + (messageText.length > 30 ? '...' : '');
          });
        });
      }

      // 2. Add the User's message LOCALLY (UI updates instantly)
      const userMessage = await chat.createLocalMessage(true, messageText.trim());

      // 3. Sync User Message REMOTELY (Background task)
      this.syncMessageRemotely(chat, userMessage, remoteService);

      return chat;
    } catch (error) {
      console.error('Service Error - Failed to process message:', error);
      throw error;
    }
  },

  /**
   * Saves the final streamed AI response and evidence to the databases.
   */
  async saveAiMessage(
    chat: Chat,
    fullContent: string,
    evidence: EvidenceType | undefined,
    remoteService: RemoteChatService
  ): Promise<void> {
    try {
      // A. Add AI message LOCALLY (false indicates it is not from the user)
      const aiMessage = await chat.createLocalMessage(false, fullContent, evidence);

      // B. Sync AI Message REMOTELY (Background task)
      this.syncMessageRemotely(chat, aiMessage, remoteService);
    } catch (error) {
      console.error('Service Error - Failed to save AI message:', error);
      throw error;
    }
  },

  /**
   * Helper function to handle the remote sync and local status update
   */
  async syncMessageRemotely(chat: Chat, localMessage: any, remoteService: RemoteChatService) {
    // 1. Build the clean payload
    const payload = {
      chat_id: chat.id,
      role: localMessage.role,
      content: localMessage.content,
      evidence: localMessage.evidence,
      created_at: new Date().toISOString(),
      title: chat.title
    };

    // 2. Attempt Sync
    let success = await remoteService.addMessage(payload);

    // 3. Retry Logic
    if (!success) {
      console.warn(`[Sync Warning] Retrying sync for message ${localMessage.id}...`);
      success = await remoteService.addMessage(payload); // Retry once
    }

    // 4. Update Local Database Status
    if (success) {
      await chat.updateMessageStatus(localMessage, 'synced');
    } else {
      console.error(`[Sync Error] Failed to sync message ${localMessage.id}.`);
    }
  },

  /**
   * Deletes a chat and its associated messages remotely and locally.
   */
  async deleteChat(chat: Chat, remoteService: RemoteChatService): Promise<void> {
    try {
      // Try remote deletion first
      await remoteService.deleteChat(chat.id).catch(err =>
        console.error('Failed remote delete, proceeding locally:', err)
      );
      // Delete locally
      await chat.markAsDeletedLocally();
    } catch (error) {
      console.error('Service Error - Failed to delete chat:', error);
      throw error;
    }
  }
};
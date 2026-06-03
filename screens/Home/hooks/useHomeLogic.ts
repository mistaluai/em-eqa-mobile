import { useAuthStore } from '@/services/databases/supabase/supabaseAuth';
import { useRemoteChats } from '@/services/databases/supabase/supabaseChats';
import { chatService } from '@/services/userChats/chatService';
import { streamAgentResponse } from '@/services/vqa/agentic_vqa';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import Chat from '../../../services/databases/watermelondb/models/Chat';
import { EvidenceType } from '../../../shared/types/evidence';

export const useHomeLogic = () => {
  const navigation = useNavigation();
  const remoteService = useRemoteChats();

  // 1. Pull the user ID from your auth store
  const { userid } = useAuthStore();

  const [isSearchDrawerVisible, setIsSearchDrawerVisible] = useState(false);
  const [isEvidenceModalVisible, setIsEvidenceModalVisible] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceType | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  // 2. New streaming UI states
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiStatusText, setAiStatusText] = useState<string | null>(null);
  const [liveStreamedContent, setLiveStreamedContent] = useState<string>('');

  // 3. Keep track of the stream so we can abort it if the user closes the app or chat
  const abortStreamRef = useRef<(() => void) | null>(null);

  // Cleanup the stream if the component unmounts
  useEffect(() => {
    return () => {
      if (abortStreamRef.current) {
        abortStreamRef.current();
      }
    };
  }, []);

  const handleSendMessage = async (messageText: string) => {
    // Guard clauses
    if (!messageText.trim() || !userid) return;

    try {
      // 4. Prepare UI for the stream
      setIsAiTyping(true);
      setAiStatusText('Agent thinking...');
      setLiveStreamedContent('');

      // 5. Save the USER message to local DB & Supabase first
      const resultingChat = await chatService.sendMessage(messageText, activeChat, remoteService);
      let currentChat = activeChat;

      if (resultingChat && resultingChat.id !== activeChat?.id) {
        setActiveChat(resultingChat);
        currentChat = resultingChat;
      }

      // 6. Extract history for the backend context
      let historyPayload: { role: string; content: string }[] = [];
      if (currentChat) {
        const messages = await currentChat.messages.fetch();
        // Sort chronologically and exclude the current question (the backend handles the current question explicitly)
        historyPayload = messages
          .filter(m => m.content !== messageText)
          .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
          .map(m => ({ role: m.role, content: m.content }));
      }

      // 7. Fire off the SSE Stream
      abortStreamRef.current = streamAgentResponse(
        userid,
        messageText,
        historyPayload,
        {
          onStatus: (status) => {
            setAiStatusText(status); // Updates: "Downloading video...", etc.
          },
          onContent: (chunk) => {
            setAiStatusText(null); // Clear the status indicator once tokens start flowing
            setLiveStreamedContent((prev) => prev + chunk);
          },
          onEvidence: (evidence) => {
            // Optional: you can trigger a small toast notification here if you want
            console.log("Agent selected evidence:", evidence.title);
          },
          onError: (errorMsg) => {
            console.error('Agent Stream Error:', errorMsg);
            setAiStatusText(`Error: ${errorMsg}`);
            // Let the UI linger on the error for a moment before clearing, or handle explicitly
          },
          onDone: async (fullContent, finalEvidence) => {
            // 8. Stream is complete. Save the AI's fully constructed message to WatermelonDB.
            if (fullContent && currentChat) {
              // Ensure your chatService has a method to save AI responses, e.g., saveAiMessage
              // It should create a message with role = 'model' and attach the evidence JSON
              await chatService.saveAiMessage(currentChat, fullContent, finalEvidence, remoteService);
            }

            // 9. Reset stream UI states so WatermelonDB takes over rendering
            setIsAiTyping(false);
            setAiStatusText(null);
            setLiveStreamedContent('');
            abortStreamRef.current = null;
          }
        }
      );

    } catch (error) {
      console.error('Failed to send message via hook:', error);
      setIsAiTyping(false);
      setAiStatusText(null);
      setLiveStreamedContent('');
    }
  };

  const handleAiResponseReceived = () => {
    // We can safely leave this mostly empty or remove it from ChatContainer 
    // since the SSE onDone callback now handles the lifecycle completion.
    setIsAiTyping(false);
  };

  const handleSelectChat = (chat: Chat | null) => {
    setActiveChat(chat);
    handleCloseSearchDrawer();
  };

  const handleDeleteChat = async (chat: Chat) => {
    try {
      if (activeChat?.id === chat.id) {
        setActiveChat(null);
      }
      await chatService.deleteChat(chat, remoteService);
    } catch (error) {
      console.error('Failed to delete chat via hook:', error);
    }
  };

  const handleEvidencePress = (evidence: EvidenceType) => {
    setSelectedEvidence(evidence);
    setIsEvidenceModalVisible(true);
  };

  const handleCloseEvidenceModal = () => {
    setSelectedEvidence(null);
    setIsEvidenceModalVisible(false);
  };

  const handleGoToEventDetails = () => {
    setIsEvidenceModalVisible(false);
    (navigation as any).navigate('EventDetails', { evidence: selectedEvidence });
  };

  const handleOpenSearchDrawer = () => {
    setIsSearchDrawerVisible(true);
  };

  const handleCloseSearchDrawer = () => {
    setIsSearchDrawerVisible(false);
  };

  return {
    isSearchDrawerVisible,
    isEvidenceModalVisible,
    isAiTyping,
    aiStatusText,        // Exported for ChatContainer
    liveStreamedContent, // Exported for ChatContainer
    selectedEvidence,
    activeChat,
    handleSendMessage,
    handleSelectChat,
    handleDeleteChat,
    handleEvidencePress,
    handleCloseEvidenceModal,
    handleGoToEventDetails,
    handleOpenSearchDrawer,
    handleCloseSearchDrawer,
    handleAiResponseReceived,
  };
};
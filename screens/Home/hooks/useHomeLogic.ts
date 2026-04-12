import { useRemoteChats } from '@/services/databases/supabase/supabaseChats';
import { chatService } from '@/services/userChats/chatService';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Chat from '../../../services/databases/watermelondb/models/Chat';
import { EvidenceType } from '../../../shared/types/evidence';

// 1. Import your remote chats hook (adjust the path if needed)

/**
 * Custom hook for HomeScreen logic
 * Handles drawer states, chat input, messages, and navigation
 */
export const useHomeLogic = () => {
  const navigation = useNavigation();

  // 2. Initialize the remote service
  const remoteService = useRemoteChats();

  const [isSearchDrawerVisible, setIsSearchDrawerVisible] = useState(false);
  const [isEvidenceModalVisible, setIsEvidenceModalVisible] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceType | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSendMessage = async (messageText: string) => {
    try {
      setIsAiTyping(true);

      // 3. Pass remoteService as the third argument
      const resultingChat = await chatService.sendMessage(messageText, activeChat, remoteService);

      if (resultingChat && resultingChat.id !== activeChat?.id) {
        setActiveChat(resultingChat);
      }
    } catch (error) {
      console.error('Failed to send message via hook:', error);
    } finally {
      // Safely reset the typing state whether the request succeeds or fails
      setIsAiTyping(false);
    }
  };

  const handleAiResponseReceived = () => {
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
      // 4. Pass remoteService as the second argument
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
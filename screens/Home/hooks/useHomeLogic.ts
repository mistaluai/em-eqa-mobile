import { chatService } from '@/services/userChats/chatService';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Chat from '../../../services/databases/watermelondb/models/Chat';

import { EvidenceType } from '../../../shared/types/evidence';

/**
 * Custom hook for HomeScreen logic
 * Handles drawer states, chat input, messages, and navigation
 */
export const useHomeLogic = () => {
  const navigation = useNavigation();
  const [isSearchDrawerVisible, setIsSearchDrawerVisible] = useState(false);
  const [isEvidenceModalVisible, setIsEvidenceModalVisible] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceType | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSendMessage = async (messageText: string) => {
    try {
      setIsAiTyping(true);
      const resultingChat = await chatService.sendMessage(messageText, activeChat);
      if (resultingChat && resultingChat.id !== activeChat?.id) {
        setActiveChat(resultingChat);
      }
    } catch (error) {
      setIsAiTyping(false);
      console.error('Failed to send message via hook:', error);
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
      await chatService.deleteChat(chat);
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
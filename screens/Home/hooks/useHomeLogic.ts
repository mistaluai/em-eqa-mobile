import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Chat from '../../../services/databases/watermelondb/models/Chat';
import { chatService } from '../../../services/userChats/chatService';

/**
 * Custom hook for HomeScreen logic
 * Handles drawer states, chat input, messages, and navigation
 */
export const useHomeLogic = () => {
  const navigation = useNavigation();
  const [isSearchDrawerVisible, setIsSearchDrawerVisible] = useState(false);
  const [isEvidenceModalVisible, setIsEvidenceModalVisible] = useState(false);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const handleSendMessage = async (messageText: string) => {
    try {
      const resultingChat = await chatService.sendMessage(messageText, activeChat);
      if (resultingChat && resultingChat.id !== activeChat?.id) {
        setActiveChat(resultingChat);
      }
    } catch (error) {
      console.error('Failed to send message via hook:', error);
    }
  };

  const handleSelectChat = (chat: Chat | null) => {
    setActiveChat(chat);
    handleCloseSearchDrawer();
  };

  const handleEvidencePress = () => {
    setIsEvidenceModalVisible(true);
  };

  const handleCloseEvidenceModal = () => {
    setIsEvidenceModalVisible(false);
  };

  const handleGoToEventDetails = () => {
    setIsEvidenceModalVisible(false);
    navigation.navigate('EventDetails' as never);
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
    activeChat,
    handleSendMessage,
    handleSelectChat,
    handleEvidencePress,
    handleCloseEvidenceModal,
    handleGoToEventDetails,
    handleOpenSearchDrawer,
    handleCloseSearchDrawer,
  };
};
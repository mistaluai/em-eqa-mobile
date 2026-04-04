import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  hasEvidence?: boolean;
}

/**
 * Custom hook for HomeScreen logic
 * Handles drawer states, chat input, messages, and navigation
 */
export const useHomeLogic = () => {
  const navigation = useNavigation();
  const [isSearchDrawerVisible, setIsSearchDrawerVisible] = useState(false);
  const [isEvidenceModalVisible, setIsEvidenceModalVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 2,
      sender: 'user',
      text: 'When was the last time I took Panadol?',
      hasEvidence: false
    },
    {
      id: 3,
      sender: 'ai',
      text: 'You took two Panadol tablets at 10:15 AM standing by the kitchen counter. I have isolated that clip for verification.',
      hasEvidence: true
    },
  ]);

  const handleSendMessage = (messageText: string) => {
    if (messageText.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: messageText.trim(),
        hasEvidence: false,
      };
      setMessages(prev => [newMessage, ...prev]);
    }
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

  // const handleOpenDrawer = () => {
  //   setIsDrawerOpen(true);
  // };

  // const handleCloseDrawer = () => {
  //   setIsDrawerOpen(false);
  // };

  const handleOpenSearchDrawer = () => {
    setIsSearchDrawerVisible(true);
  };

  const handleCloseSearchDrawer = () => {
    setIsSearchDrawerVisible(false);
  };

  return {
    isSearchDrawerVisible,
    isEvidenceModalVisible,
    messages,
    handleSendMessage,
    handleEvidencePress,
    handleCloseEvidenceModal,
    handleGoToEventDetails,
    handleOpenSearchDrawer,
    handleCloseSearchDrawer,
  };
};
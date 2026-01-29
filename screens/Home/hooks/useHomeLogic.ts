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
    { id: 1, sender: 'ai', text: 'Welcome back, John. I have summarized your events from the last 2 hours. You were highly engaged in a meeting about the Q4 budget.', hasEvidence: true },
    { id: 2, sender: 'user', text: 'What did I agree to do next?', hasEvidence: false },
    { id: 3, sender: 'ai', text: 'You agreed to draft the initial pitch deck by Friday. I have the full clip if you want to verify the commitment.', hasEvidence: true },
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
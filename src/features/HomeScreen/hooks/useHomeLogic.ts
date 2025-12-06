import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

/**
 * Custom hook for HomeScreen logic
 * Handles drawer states, chat input, and navigation
 */
export const useHomeLogic = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchDrawerVisible, setIsSearchDrawerVisible] = useState(false);
  const [isEvidenceModalVisible, setIsEvidenceModalVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatInput('');
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

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenSearchDrawer = () => {
    setIsSearchDrawerVisible(true);
  };

  const handleCloseSearchDrawer = () => {
    setIsSearchDrawerVisible(false);
  };

  return {
    isDrawerOpen,
    isSearchDrawerVisible,
    isEvidenceModalVisible,
    chatInput,
    setChatInput,
    handleSendMessage,
    handleEvidencePress,
    handleCloseEvidenceModal,
    handleGoToEventDetails,
    handleOpenDrawer,
    handleCloseDrawer,
    handleOpenSearchDrawer,
    handleCloseSearchDrawer,
  };
};


import { useState } from 'react';
import { availableTriggers } from '../constants';

/**
 * Custom hook for ProfileSettingsScreen logic
 * Handles form state and trigger selection
 */
export const useProfileSettingsLogic = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>(['Keys', 'Laptop']);

  const handleTriggerToggle = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger) ? prev.filter(t => t !== trigger) : [...prev, trigger]
    );
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleChangePassword = () => {
    console.log('Change Password');
  };

  const handleChangeAvatar = () => {
    console.log('Change avatar');
  };

  return {
    username,
    email,
    isModalVisible,
    selectedTriggers,
    setUsername,
    setEmail,
    handleTriggerToggle,
    handleOpenModal,
    handleCloseModal,
    handleChangePassword,
    handleChangeAvatar,
  };
};


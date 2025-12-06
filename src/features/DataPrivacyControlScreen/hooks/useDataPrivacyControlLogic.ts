import { useState } from 'react';

/**
 * Custom hook for DataPrivacyControlScreen logic
 * Handles privacy settings state and actions
 */
export const useDataPrivacyControlLogic = () => {
  const [isRecordingEnabled, setIsRecordingEnabled] = useState(true);
  const [dataRetentionDays, setDataRetentionDays] = useState(30);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDeleteAllData = () => {
    console.log('ALL DATA DELETED');
    setIsDeleteModalVisible(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  return {
    isRecordingEnabled,
    dataRetentionDays,
    isDeleteModalVisible,
    setIsRecordingEnabled,
    setDataRetentionDays,
    handleDeleteAllData,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
};


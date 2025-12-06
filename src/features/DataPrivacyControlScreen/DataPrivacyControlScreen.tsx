import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { SCREEN, SECTION, SPACING, TYPOGRAPHY } from '../../theme/styles';
import { DataRetentionSlider } from './components/DataRetentionSlider';
import { DeletionConfirmationModal } from './components/DeletionConfirmationModal';
import { RecordingPermissionCard } from './components/RecordingPermissionCard';
import { useDataPrivacyControlLogic } from './hooks/useDataPrivacyControlLogic';

/**
 * DataPrivacyControlScreen - Main screen component for privacy and data control
 * Handles composition and rendering using hooks and components
 */
const DataPrivacyControlScreen: React.FC = () => {
  const {
    isRecordingEnabled,
    dataRetentionDays,
    isDeleteModalVisible,
    setIsRecordingEnabled,
    setDataRetentionDays,
    handleDeleteAllData,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useDataPrivacyControlLogic();

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Privacy & Data Control" showBack={true} />

      <DeletionConfirmationModal
        isVisible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAllData}
      />

      <View style={SCREEN.container}>
        <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title]}>Recording Permissions</Text>
        <RecordingPermissionCard
          isRecordingEnabled={isRecordingEnabled}
          onToggle={setIsRecordingEnabled}
        />

        <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title]}>Data Storage</Text>
        <DataRetentionSlider
          retentionDays={dataRetentionDays}
          onRetentionDaysChange={setDataRetentionDays}
        />

        <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title]}>Data Deletion</Text>
        <AppButton
          title="Delete All My Data"
          onPress={handleOpenDeleteModal}
          variant="primary"
          style={SCREEN.dataPrivacyDeleteButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default DataPrivacyControlScreen;
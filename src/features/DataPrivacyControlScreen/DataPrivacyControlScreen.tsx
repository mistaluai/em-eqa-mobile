import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/src/theme/colors';
import { DeleteAllMyDataStyles } from '@/src/theme/styles/DataPrivacyControlScreen/DeleteAllMyDataStyle';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { SCREEN, SECTION, TYPOGRAPHY } from '../../theme';
import { DataRetentionSlider } from './components/DataRetentionSlider';
import { DeletionConfirmationModal } from './components/DeletionConfirmationModal';
import { useDataPrivacyControlLogic } from './hooks/useDataPrivacyControlLogic';

/**
 * DataPrivacyControlScreen - Main screen component for privacy and data control
 */
const DataPrivacyControlScreen: React.FC = () => {
  const {
    dataRetentionDays,
    isDeleteModalVisible,
    setDataRetentionDays,
    handleDeleteAllData,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useDataPrivacyControlLogic();

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Cloud Data Control" showBack={true} />

      <DeletionConfirmationModal
        isVisible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAllData}
      />

      <View style={SCREEN.container}>

        {/* Retention Section */}
        <View style={DeleteAllMyDataStyles.sectionContainer}>
          <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title]}>Data Storage</Text>
          <DataRetentionSlider
            retentionDays={dataRetentionDays}
            onRetentionDaysChange={setDataRetentionDays}
          />
        </View>

        {/* Danger Zone / Deletion Section */}
        <View style={DeleteAllMyDataStyles.dangerZoneContainer}>
          <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title, DeleteAllMyDataStyles.dangerTitle]}>
            Data Deletion
          </Text>

          <AppButton
            title="Delete All My Events"
            onPress={handleOpenDeleteModal}
            variant="primary"
            style={[SCREEN.dataPrivacyDeleteButton, DeleteAllMyDataStyles.dangerButton]}
          />

          <View style={DeleteAllMyDataStyles.warningContainer}>
            <MaterialCommunityIcons
              name="alert"
              size={16}
              color={COLORS.navPrivacy} // Matches the red text in styles
              style={{ marginTop: 2 }}
            />
            <Text style={DeleteAllMyDataStyles.warningText}>
              This action will <Text style={{ fontWeight: 'bold' }}>permanently remove</Text> all your recorded videos and events.
              This cannot be undone and there is no possibility to recover this data.
            </Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default DataPrivacyControlScreen;
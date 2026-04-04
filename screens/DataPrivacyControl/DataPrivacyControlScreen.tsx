import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SCREEN, SPACING, TYPOGRAPHY } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
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
        <View style={styles.sectionContainer}>
          <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title]}>Data Storage</Text>
          <DataRetentionSlider
            retentionDays={dataRetentionDays}
            onRetentionDaysChange={setDataRetentionDays}
          />
        </View>

        {/* Danger Zone / Deletion Section */}
        <View style={styles.dangerZoneContainer}>
          <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title, styles.dangerTitle]}>
            Data Deletion
          </Text>

          <AppButton
            title="Delete All My Events"
            onPress={handleOpenDeleteModal}
            variant="primary"
            style={[SCREEN.dataPrivacyDeleteButton, styles.dangerButton]}
          />

          <View style={styles.warningContainer}>
            <MaterialCommunityIcons
              name="alert"
              size={16}
              color={COLORS.navPrivacy} // Matches the red text in styles
              style={{ marginTop: 2 }}
            />
            <Text style={styles.warningText}>
              This action will <Text style={{ fontWeight: 'bold' }}>permanently remove</Text> all your recorded videos and events.
              This cannot be undone and there is no possibility to recover this data.
            </Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: SPACING.s32,
  },
  // Creates a visual "Danger Zone" box
  dangerZoneContainer: {
    marginTop: SPACING.s24,
    padding: SPACING.s16,
    // Using navPrivacy (red-600) with low opacity for the background to keep it "Danger" themed
    // Alternatively, if you want it purely white/neutral, use COLORS.backgroundNeutral
    backgroundColor: `${COLORS.navPrivacy}15`, // Adding alpha for a light red tint
    borderRadius: SPACING.s12,
    borderWidth: 1,
    borderColor: COLORS.navPrivacy, // Red border
  },
  dangerTitle: {
    color: COLORS.navPrivacy, // Red title
    marginBottom: SPACING.s16,
    marginTop: SPACING.s4,
  },
  dangerButton: {
    backgroundColor: COLORS.navPrivacy, // Strong Red
    borderColor: COLORS.navPrivacy,
  },
  dangerButtonText: {
    color: COLORS.backgroundLight, // White text
    fontWeight: '700',
  },
  warningContainer: {
    flexDirection: 'row',
    marginTop: SPACING.s12,
    paddingHorizontal: SPACING.s4,
    gap: SPACING.s8,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.navPrivacy, // Red text for readability
  },
});

const SECTION = StyleSheet.create({
  title: {
    color: COLORS.textPrimary,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700',
  },
  titleWithTopMargin: {
    color: COLORS.textPrimary,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700',
  },
  titleNoTopMargin: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s12,
    fontWeight: '700',
  },
});

export default DataPrivacyControlScreen;
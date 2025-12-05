import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
import { COLORS } from '../../theme/colors';
import { SPACING, TYPOGRAPHY } from '../../theme/styles';
import { RecordingPermissionCard } from './components/RecordingPermissionCard';
import { DataRetentionSlider } from './components/DataRetentionSlider';
import { DeletionConfirmationModal } from './components/DeletionConfirmationModal';

const DataPrivacyControlScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isRecordingEnabled, setIsRecordingEnabled] = useState(true);
  const [dataRetentionDays, setDataRetentionDays] = useState(30);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDeleteAllData = () => {
    console.log('ALL DATA DELETED');
    setIsDeleteModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Privacy & Data Control"
        showBack={true}
        rightIconName="menu-outline"
        onRightIconPress={() => console.log('Open Menu')}
      />

      <DeletionConfirmationModal
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteAllData}
      />

      <View style={styles.container}>
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Recording Permissions</Text>
        <RecordingPermissionCard
          isRecordingEnabled={isRecordingEnabled}
          onToggle={setIsRecordingEnabled}
        />

        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Data Storage</Text>
        <DataRetentionSlider
          retentionDays={dataRetentionDays}
          onRetentionDaysChange={setDataRetentionDays}
        />

        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Data Deletion</Text>
        <AppButton
          title="Delete All My Data"
          onPress={() => setIsDeleteModalVisible(true)}
          variant="danger"
          style={styles.deleteButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
  container: {
    flex: 1,
    padding: SPACING.s24,
  },
  sectionTitle: {
    color: COLORS.white,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700',
  },
  deleteButton: {
    width: '100%',
    marginTop: SPACING.s12,
  },
});

export default DataPrivacyControlScreen;


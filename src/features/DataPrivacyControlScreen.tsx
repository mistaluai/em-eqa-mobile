import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import AppHeader from '../components/HeaderComponent';
import AppModal from '../components/ModalComponent';
import { COLORS } from '../theme/colors';
import { SPACING, TYPOGRAPHY } from '../theme/styles';

const { width } = Dimensions.get('window');

const PrivacyDataControlScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isRecordingEnabled, setIsRecordingEnabled] = useState(true);
  const [dataRetentionDays, setDataRetentionDays] = useState(30);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Retention days options for slider snapping
  const RETENTION_OPTIONS = [10, 30, 45, 90];

  const snapToClosestOption = (value: number) => {
    return RETENTION_OPTIONS.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

  const handleDeleteAllData = () => {
    // Mock deletion logic
    console.log('ALL DATA DELETED');
    setIsDeleteModalVisible(false);
  };

  const DeletionConfirmationModal: React.FC = () => (
    <AppModal isVisible={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)}>
      <View style={{ alignItems: 'center' }}>
        <Ionicons name="warning-outline" size={50} color={COLORS.desertSand} style={{ marginBottom: SPACING.s16 }} />
        <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginBottom: SPACING.s8 }]}>
          Confirm Deletion
        </Text>
        <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.softGray, textAlign: 'center', marginBottom: SPACING.s24 }]}>
          Are you sure you want to delete ALL your recorded data? This cannot be undone.
        </Text>
        <AppButton
          title="Delete Forever"
          onPress={handleDeleteAllData}
          variant="danger"
          style={{ width: '100%', marginBottom: SPACING.s12 }}
        />
        <AppButton
          title="Cancel"
          onPress={() => setIsDeleteModalVisible(false)}
          variant="secondary"
          style={{ width: '100%', borderColor: COLORS.gray700 }}
        />
      </View>
    </AppModal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Privacy & Data Control"
        showBack={true}
        rightIconName="menu-outline"
        onRightIconPress={() => console.log('Open Menu')}
      />

      <DeletionConfirmationModal />

      <View style={styles.container}>
        {/* Recording Permissions */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Recording Permissions</Text>
        <AppCard style={styles.card}>
          <View style={styles.row}>
            <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.white }]}>Audio Recording</Text>
            <Switch
              trackColor={{ false: COLORS.gray700, true: COLORS.lightLavender }}
              thumbColor={isRecordingEnabled ? COLORS.ultraViolet : COLORS.softGray}
              onValueChange={setIsRecordingEnabled}
              value={isRecordingEnabled}
            />
          </View>
          <Text style={[TYPOGRAPHY.Caption, { color: COLORS.softGray, marginTop: SPACING.s4 }]}>
            {isRecordingEnabled ? 'Audio is currently being recorded.' : 'Audio recording is disabled.'}
          </Text>
        </AppCard>

        {/* Data Storage */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Data Storage</Text>
        <AppCard style={styles.card}>
          <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.white, marginBottom: SPACING.s20 }]}>
            Retain Clips for: <Text style={{ color: COLORS.ultraViolet, fontWeight: '700' }}>{dataRetentionDays} Days</Text>
          </Text>

          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={10}
            maximumValue={90}
            step={1}
            value={dataRetentionDays}
            onValueChange={(value) => setDataRetentionDays(value)}
            onSlidingComplete={(value) => setDataRetentionDays(snapToClosestOption(value))}
            minimumTrackTintColor={COLORS.ultraViolet}
            maximumTrackTintColor={COLORS.gray700}
            thumbTintColor={COLORS.ultraViolet}
          />

          <View style={styles.sliderLabels}>
            {RETENTION_OPTIONS.map((day) => (
              <Text key={day} style={[TYPOGRAPHY.Caption, { color: COLORS.softGray, fontWeight: '600' }]}>
                {day}
              </Text>
            ))}
          </View>
        </AppCard>

        {/* Data Deletion */}
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
  card: {
    backgroundColor: COLORS.gray700,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.s8,
  },
  deleteButton: {
    width: '100%',
    marginTop: SPACING.s12,
  }
});

export default PrivacyDataControlScreen;
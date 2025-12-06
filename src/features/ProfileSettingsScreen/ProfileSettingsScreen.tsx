import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppHeader from '../../components/HeaderComponent';
import AppInput from '../../components/InputComponent';
import { COLORS } from '../../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../../theme/styles';
import { AvatarUpload } from './components/AvatarUpload';
import { TriggerPill } from './components/TriggerPill';
import { TriggerSelectionModal } from './components/TriggerSelectionModal';
import { availableTriggers } from './constants';

const ProfileRecordingSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>(['Keys', 'Laptop']);

  const handleTriggerToggle = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger) ? prev.filter(t => t !== trigger) : [...prev, trigger]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Profile & Recording Settings"
        showBack={true}
      />

      <TriggerSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        availableTriggers={availableTriggers}
        selectedTriggers={selectedTriggers}
        onToggleTrigger={handleTriggerToggle}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Personal Info</Text>
        <AvatarUpload onPress={() => console.log('Change avatar')} />

        <AppInput label="Username" value={username} onChangeText={setUsername} />
        <View style={{ height: SPACING.s16 }} />
        <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <View style={{ height: SPACING.s16 }} />

        <Pressable onPress={() => console.log('Change Password')} style={styles.changePasswordLink}>
          <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.primary, textDecorationLine: 'underline', fontWeight: '600', paddingLeft: 222}]}>
            Change Password
          </Text>
        </Pressable>

        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Trigger Preferences</Text>
        <View style={styles.triggerHeader}>
          <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textSecondary, fontWeight: '600' }]}>Object Triggers</Text>
          <Pressable onPress={() => setIsModalVisible(true)} style={styles.addButton}>
            <Text style={{ color: COLORS.textPrimary, fontSize: 24, fontWeight: '700' }}>+</Text>
          </Pressable>
        </View>

        <AppCard style={styles.triggerCard}>
          {selectedTriggers.length > 0 ? (
            <View style={styles.pillsContainer}>
              {selectedTriggers.map((trigger, index) => (
                <TriggerPill key={index} trigger={trigger} onRemove={handleTriggerToggle} />
              ))}
            </View>
          ) : (
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary, textAlign: 'center' }]}>No triggers selected</Text>
          )}
        </AppCard>

        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Critical Events & Alerts</Text>
        <AppCard style={styles.triggerCard}>
          <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary, textAlign: 'center' }]}>
            Configure event alerts here (Future Feature)
          </Text>
        </AppCard>

        <View style={{ height: SPACING.s32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  container: {
    padding: SPACING.s24,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700',
  },
  changePasswordLink: {
    alignSelf: 'flex-start',
    marginTop: SPACING.s12,
  },
  triggerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s16,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.default,
  },
  triggerCard: {
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.s8,
  },
});

export default ProfileRecordingSettingsScreen;
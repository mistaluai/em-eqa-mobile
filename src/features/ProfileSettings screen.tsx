import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import AppHeader from '../components/HeaderComponent';
import AppInput from '../components/InputComponent';
import AppModal from '../components/ModalComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../theme/styles';

const { width, height } = Dimensions.get('window');

const availableTriggers = ['Medicine bottle', 'Wallet', 'Keys', 'Laptop', 'Car Door', 'Briefcase', 'Phone Call', 'Whiteboard'];

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

  const TriggerSelectionModal: React.FC = () => (
    <AppModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} modalWidth={width * 0.85}>
      <View style={styles.modalContent}>
        <Text style={[TYPOGRAPHY.HeadlineM, styles.modalTitle]}>Select Recording Triggers</Text>
        <ScrollView style={styles.triggerList}>
          {availableTriggers.map((trigger, index) => (
            <Pressable
              key={index}
              onPress={() => handleTriggerToggle(trigger)}
              style={styles.triggerItem}
            >
              <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.white }]}>{trigger}</Text>
              <View style={[
                styles.checkbox,
                selectedTriggers.includes(trigger) && styles.checkboxSelected
              ]}>
                {selectedTriggers.includes(trigger) && (
                  <Ionicons name="checkmark" size={16} color={COLORS.white} />
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <AppButton title="Done" onPress={() => setIsModalVisible(false)} />
      </View>
    </AppModal>
  );

  const TriggerPill: React.FC<{ trigger: string }> = ({ trigger }) => (
    <Pressable
      onPress={() => setSelectedTriggers(prev => prev.filter(t => t !== trigger))}
      style={styles.triggerPill}
    >
      <Text style={[TYPOGRAPHY.Caption, { color: COLORS.ultraViolet, fontWeight: '700', marginRight: SPACING.s4 }]}>{trigger}</Text>
      <Ionicons name="close-circle" size={16} color={COLORS.ultraViolet} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Profile & Recording Settings"
        showBack={true}
        rightIconName="menu-outline"
        onRightIconPress={() => console.log('Open Menu')}
      />

      <TriggerSelectionModal />

      <ScrollView contentContainerStyle={styles.container}>
        {/* 1. Personal Info */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Personal Info</Text>
        <View style={styles.avatarContainer}>
          <Pressable onPress={() => console.log('Change avatar')} style={styles.avatar}>
            <Ionicons name="person-circle-outline" size={100} color={COLORS.desertSand} />
          </Pressable>
        </View>

        <AppInput label="Username" value={username} onChangeText={setUsername} />
        <View style={{ height: SPACING.s16 }} />
        <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <View style={{ height: SPACING.s16 }} />

        <Pressable onPress={() => console.log('Change Password')} style={styles.changePasswordLink}>
          <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.desertSand, textDecorationLine: 'underline', fontWeight: '600' }]}>
            Change Password
          </Text>
        </Pressable>

        {/* 2. Trigger preferences */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Trigger Preferences</Text>
        <View style={styles.triggerHeader}>
          <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.softGray, fontWeight: '600' }]}>Object Triggers</Text>
          <Pressable onPress={() => setIsModalVisible(true)} style={styles.addButton}>
            <Ionicons name="add" size={24} color={COLORS.white} />
          </Pressable>
        </View>

        <AppCard style={styles.triggerCard}>
          {selectedTriggers.length > 0 ? (
            <View style={styles.pillsContainer}>
              {selectedTriggers.map((trigger, index) => (
                <TriggerPill key={index} trigger={trigger} />
              ))}
            </View>
          ) : (
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.softGray, textAlign: 'center' }]}>No triggers selected</Text>
          )}
        </AppCard>

        {/* 3. Critical Events & Alerts */}
        <Text style={[TYPOGRAPHY.HeadlineM, styles.sectionTitle]}>Critical Events & Alerts</Text>
        <AppCard style={styles.triggerCard}>
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.softGray, textAlign: 'center' }]}>
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
    backgroundColor: COLORS.carbonBlack,
  },
  container: {
    padding: SPACING.s24,
  },
  sectionTitle: {
    color: COLORS.white,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SPACING.s32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.desertSand,
    backgroundColor: `${COLORS.ultraViolet}33`,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    backgroundColor: COLORS.ultraViolet,
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
  triggerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.ultraViolet}20`,
    paddingVertical: SPACING.s8,
    paddingLeft: SPACING.s12,
    paddingRight: SPACING.s8,
    borderRadius: RADIUS.large,
  },
  // Modal Styles
  modalContent: {
    backgroundColor: COLORS.carbonBlack,
    borderRadius: RADIUS.large,
    padding: SPACING.s24,
  },
  modalTitle: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.s24,
    fontWeight: '700',
  },
  triggerList: {
    maxHeight: height * 0.5,
    marginBottom: SPACING.s24,
  },
  triggerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.s12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray700,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.softGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.ultraViolet,
    borderColor: COLORS.ultraViolet,
  },
});

export default ProfileRecordingSettingsScreen;
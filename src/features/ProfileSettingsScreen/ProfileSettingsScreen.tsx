import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppHeader from '../../components/HeaderComponent';
import AppInput from '../../components/InputComponent';
import { COLORS } from '../../theme/colors';
import { BUTTON, CARD, PILL, SCREEN, SECTION, SPACING, TEXT, TRIGGER_HEADER, TYPOGRAPHY } from '../../theme/styles';
import { AvatarUpload } from './components/AvatarUpload';
import { TriggerPill } from './components/TriggerPill';
import { TriggerSelectionModal } from './components/TriggerSelectionModal';
import { availableTriggers } from './constants';
import { useProfileSettingsLogic } from './hooks/useProfileSettingsLogic';

/**
 * ProfileSettingsScreen - Main screen component for profile and settings
 * Handles composition and rendering using hooks and components
 */
const ProfileRecordingSettingsScreen: React.FC = () => {
  const {
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
  } = useProfileSettingsLogic();

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <AppHeader title="Profile & Recording Settings" showBack={true} />

      <TriggerSelectionModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        availableTriggers={availableTriggers}
        selectedTriggers={selectedTriggers}
        onToggleTrigger={handleTriggerToggle}
      />

      <ScrollView contentContainerStyle={SCREEN.container}>
        <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title]}>Personal Info</Text>
        <AvatarUpload onPress={handleChangeAvatar} />

        <AppInput label="Username" value={username} onChangeText={setUsername} />
        <View style={{ height: SPACING.s16 }} />
        <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <View style={{ height: SPACING.s16 }} />

        <Pressable onPress={handleChangePassword} style={SCREEN.profileChangePasswordLink}>
          <Text style={[TYPOGRAPHY.BodyM, TEXT.changePassword]}>Change Password</Text>
        </Pressable>

        <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title]}>Trigger Preferences</Text>
        <View style={TRIGGER_HEADER.container}>
          <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textSecondary, fontWeight: '600' }]}>
            Object Triggers
          </Text>
          <Pressable onPress={handleOpenModal} style={BUTTON.add}>
            <Text style={{ color: COLORS.textPrimary, fontSize: 24, fontWeight: '700' }}>+</Text>
          </Pressable>
        </View>

        <AppCard style={CARD.trigger}>
          {selectedTriggers.length > 0 ? (
            <View style={PILL.container}>
              {selectedTriggers.map((trigger, index) => (
                <TriggerPill key={index} trigger={trigger} onRemove={handleTriggerToggle} />
              ))}
            </View>
          ) : (
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary, textAlign: 'center' }]}>
              No triggers selected
            </Text>
          )}
        </AppCard>

        <Text style={[TYPOGRAPHY.HeadlineM, SECTION.title]}>Critical Events & Alerts</Text>
        <AppCard style={CARD.trigger}>
          <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary, textAlign: 'center' }]}>
            Configure event alerts here (Future Feature)
          </Text>
        </AppCard>

        <View style={{ height: SPACING.s32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileRecordingSettingsScreen;
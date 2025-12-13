import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
// Import your Avatar component
import { Avatar } from '../../components/Avatar';

// Theme
import { COLORS } from '../../theme/colors';
import { ProfileSettingsScreenStyles } from '../../theme/styles/ProfileSettingsScreen/ProfileSettingsScreenStyle';

// Hook
import { useProfileSettingsLogic } from './hooks/useProfileSettingsLogic';

const ProfileSettingsScreen: React.FC = () => {
  // 1. Destructure everything from your custom hook
  const {
    fullName,
    username,
    email,
    age,
    avatarUri,
    isAvatarLoading,
    naturalLanguageInput,
    setNaturalLanguageInput,
    handleUpdateProfile,
    handleChangeAvatar,
    handleChangePassword,
  } = useProfileSettingsLogic();

  return (
    <SafeAreaView
      style={ProfileSettingsScreenStyles.screenBackground}
      edges={['top', 'left', 'right']}
    >
      <AppHeader title="Edit Profile" showBack={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={ProfileSettingsScreenStyles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Header Section */}
          <View style={ProfileSettingsScreenStyles.headerContainer}>
            <View style={ProfileSettingsScreenStyles.avatarWrapper}>
              {/* 2. Use Global Avatar Component connected to Hook State */}
              <Avatar
                uri={avatarUri}
                size={120}
                showEditBadge={true}
                isLoading={isAvatarLoading}
                onPress={handleChangeAvatar}
              />
            </View>

            <Text style={ProfileSettingsScreenStyles.nameText}>{fullName}</Text>
            <Text style={ProfileSettingsScreenStyles.usernameText}>@{username}</Text>

            <View style={ProfileSettingsScreenStyles.badgeRow}>
              {/* Age is Read-Only here */}
              <View style={ProfileSettingsScreenStyles.infoBadge}>
                <Text style={ProfileSettingsScreenStyles.badgeText}>Age {age}</Text>
              </View>
              <View
                style={[
                  ProfileSettingsScreenStyles.infoBadge,
                  { backgroundColor: '#E0F2FE' },
                ]}
              >
                <Text style={[ProfileSettingsScreenStyles.badgeText, { color: '#0284C7' }]}>
                  Free Plan
                </Text>
              </View>
            </View>
          </View>

          {/* 2. Personal Information Group */}
          <Text style={ProfileSettingsScreenStyles.sectionLabel}>Personal Information</Text>
          <View style={ProfileSettingsScreenStyles.settingsGroup}>
            <View style={ProfileSettingsScreenStyles.settingRow}>
              <View style={ProfileSettingsScreenStyles.rowIconContainer}>
                <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} />
              </View>
              <Text style={ProfileSettingsScreenStyles.rowLabel}>Name</Text>
              {/* Name is Read-Only */}
              <Text style={[ProfileSettingsScreenStyles.rowInput, { color: COLORS.textSecondary }]}>
                {fullName}
              </Text>
            </View>

            <View
              style={[
                ProfileSettingsScreenStyles.settingRow,
                ProfileSettingsScreenStyles.lastRow,
              ]}
            >
              <View style={ProfileSettingsScreenStyles.rowIconContainer}>
                <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
              </View>
              <Text style={ProfileSettingsScreenStyles.rowLabel}>Email</Text>

              <Text style={[ProfileSettingsScreenStyles.rowInput, { color: COLORS.textSecondary }]}>
                {email}
              </Text>
            </View>
          </View>

          {/* 3. Security Group */}
          <Text style={ProfileSettingsScreenStyles.sectionLabel}>Security</Text>
          <View style={ProfileSettingsScreenStyles.settingsGroup}>
            <Pressable
              style={[
                ProfileSettingsScreenStyles.settingRow,
                ProfileSettingsScreenStyles.lastRow,
              ]}
              onPress={handleChangePassword}
            >
              <View style={ProfileSettingsScreenStyles.rowIconContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} />
              </View>
              <Text style={[ProfileSettingsScreenStyles.rowLabel, { flex: 1 }]}>Password</Text>
              <Text style={{ color: COLORS.textSecondary, fontSize: 14 }}>
                Tap to change
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textSecondary}
                style={ProfileSettingsScreenStyles.chevron}
              />
            </Pressable>
          </View>

          {/* 4. Tracking Preferences Group */}
          <Text style={ProfileSettingsScreenStyles.sectionLabel}>Tracking Preferences</Text>
          <View
            style={[
              ProfileSettingsScreenStyles.settingsGroup,
              ProfileSettingsScreenStyles.textAreaContainer,
            ]}
          >
            <TextInput
              multiline
              placeholder="Tell the AI what to track..."
              placeholderTextColor={COLORS.textSecondary}
              style={ProfileSettingsScreenStyles.textAreaInput}
              value={naturalLanguageInput}
              onChangeText={setNaturalLanguageInput}
              scrollEnabled={true}
            />
          </View>

          {/* 5. Save Button */}
          <AppButton
            title="Save Changes"
            onPress={handleUpdateProfile}
            style={ProfileSettingsScreenStyles.actionButton}
            variant="primary"
          />

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;
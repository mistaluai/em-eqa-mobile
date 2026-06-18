import { useThemeStyles } from "@/theme/useThemeStyles";
import { useGlobalStyles } from "@/theme";
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/HeaderComponent';
// Import your Avatar component
import { Avatar } from '../../components/Avatar';
import AppCheckbox from '../../components/CheckboxComponent';

// Theme

// Hook
import { LAYOUT, RADIUS, SPACING } from '@/theme';
import { useProfileSettingsLogic } from './hooks/useProfileSettingsLogic';

const ProfileSettingsScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const { SCREEN, COLORS } = useGlobalStyles();
  // 1. Destructure everything from your custom hook
  const {
    fullName,
    username,
    email,
    age,
    avatarUri,
    isAvatarLoading,
    categories,
    selectedCategories,
    handleToggleCategory,
    handleUpdateProfile,
    handleChangeAvatar,
    handleChangePassword,
  } = useProfileSettingsLogic();

  return (
    <SafeAreaView
      style={styles.screenBackground}
      edges={['top', 'left', 'right']}
    >
      <AppHeader title="Edit Profile" showBack={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={LAYOUT.flex1}
      >
        <ScrollView
          style={LAYOUT.flex1}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Header Section */}
          <View style={styles.headerContainer}>
            <View style={styles.avatarWrapper}>
              {/* 2. Use Global Avatar Component connected to Hook State */}
              <Avatar
                uri={avatarUri}
                size={120}
                showEditBadge={true}
                isLoading={isAvatarLoading}
                onPress={handleChangeAvatar}
              />
            </View>

            <Text style={styles.nameText}>{fullName}</Text>
            <Text style={styles.usernameText}>@{username}</Text>

            <View style={styles.badgeRow}>
              {/* Age is Read-Only here */}
              <View style={styles.infoBadge}>
                <Text style={styles.badgeText}>Age {age}</Text>
              </View>
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>
                  Free Plan
                </Text>
              </View>
            </View>
          </View>

          {/* 2. Personal Information Group */}
          <Text style={styles.sectionLabel}>Personal Information</Text>
          <View style={styles.settingsGroup}>
            <View style={[LAYOUT.flexRowCenter, styles.settingRow]}>
              <View style={styles.rowIconContainer}>
                <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} />
              </View>
              <Text style={styles.rowLabel}>Name</Text>
              {/* Name is Read-Only */}
              <Text style={[styles.rowInput, { color: COLORS.textSecondary }]}>
                {fullName}
              </Text>
            </View>

            <View
              style={[
                LAYOUT.flexRowCenter,
                styles.settingRow,
                styles.lastRow,
              ]}
            >
              <View style={styles.rowIconContainer}>
                <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
              </View>
              <Text style={styles.rowLabel}>Email</Text>

              <Text style={[styles.rowInput, { color: COLORS.textSecondary }]}>
                {email}
              </Text>
            </View>
          </View>

          {/* 3. Security Group */}
          <Text style={styles.sectionLabel}>Security</Text>
          <View style={styles.settingsGroup}>
            <Pressable
              style={[
                LAYOUT.flexRowCenter,
                styles.settingRow,
                styles.lastRow,
              ]}
              onPress={handleChangePassword}
            >
              <View style={styles.rowIconContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} />
              </View>
              <Text style={[styles.rowLabel, { flex: 1 }]}>Password</Text>
              <Text style={{ color: COLORS.textSecondary, fontSize: 14 }}>
                Tap to change
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textSecondary}
                style={styles.chevron}
              />
            </Pressable>
          </View>

          {/* 4. Tracking Preferences Group */}
          <Text style={styles.sectionLabel}>Tracking Preferences</Text>
          <View style={styles.settingsGroup}>
            {categories.map((category, index) => {
              const isLast = index === categories.length - 1;
              return (
                <View
                  key={category}
                  style={[
                    styles.checkboxRow,
                    isLast && styles.lastRow,
                  ]}
                >
                  <AppCheckbox
                    label={category}
                    checked={selectedCategories.includes(category)}
                    onPress={() => handleToggleCategory(category)}
                  />
                </View>
              );
            })}
          </View>

          {/* 5. Save Button */}
          <AppButton
            title="Save Changes"
            onPress={handleUpdateProfile}
            style={styles.actionButton}
            variant="primary"
          />

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  // Main Background
  screenBackground: {
    backgroundColor: COLORS.backgroundLight,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SPACING.s20,
    paddingTop: SPACING.s24,
    paddingBottom: 160, // Keep large padding for scrolling
    flexGrow: 1,
  },
  // --- Header Section ---
  headerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.s32,
    marginTop: SPACING.s8,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: SPACING.s16,
    elevation: 2,
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.backgroundNeutral,
  },
  nameText: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  usernameText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: SPACING.s12,
  },
  // --- Badges ---
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.s8,
    marginTop: SPACING.s4,
  },
  infoBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: SPACING.s12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  planBadge: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: SPACING.s12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  planBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  // --- Section Labels ---
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: SPACING.s4,
    marginBottom: SPACING.s8,
    marginTop: SPACING.s24,
  },
  // --- Grouped Settings Container ---
  settingsGroup: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    // FIX: Ensure no flex is applied here
    flexGrow: 0,
  },
  // --- Row Item ---
  settingRow: {
    paddingVertical: SPACING.s16,
    paddingHorizontal: SPACING.s16,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  rowIconContainer: {
    width: 32,
    alignItems: 'flex-start',
  },
  rowLabel: {
    width: 100,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  rowInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'right',
    padding: 0,
  },
  chevron: {
    marginLeft: SPACING.s8,
    opacity: 0.3,
  },
  checkboxRow: {
    paddingHorizontal: SPACING.s16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    backgroundColor: COLORS.backgroundLight,
  },
  actionButton: {
    marginTop: SPACING.s32,
  },
});

export default ProfileSettingsScreen;
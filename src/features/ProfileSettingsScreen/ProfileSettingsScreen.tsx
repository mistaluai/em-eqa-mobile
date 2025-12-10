import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
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
import { AvatarUpload } from './components/AvatarUpload';

// Theme
import { COLORS } from '../../theme/colors';
import { ProfileSettingsScreenStyles } from '../../theme/styles/ProfileSettingsScreen/ProfileSettingsScreenStyle';

const ProfileSettingsScreen: React.FC = () => {
  const [name, setName] = useState('Luai Waleed Abdelkarim');
  const [email, setEmail] = useState('luai.wa@university.edu');
  const [preferences, setPreferences] = useState('');

  const username = 'luai_cse';
  const dobYear = '2002';
  const age = '23';

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
          // FIX: Explicitly tell ScrollView to take available space
          style={{ flex: 1 }}
          contentContainerStyle={ProfileSettingsScreenStyles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Header Section */}
          <View style={ProfileSettingsScreenStyles.headerContainer}>
            <View style={ProfileSettingsScreenStyles.avatarWrapper}>
              <AvatarUpload onPress={() => { }} />
              <View style={ProfileSettingsScreenStyles.editIconBadge}>
                <Ionicons name="pencil" size={14} color="white" />
              </View>
            </View>

            <Text style={ProfileSettingsScreenStyles.nameText}>{name}</Text>
            <Text style={ProfileSettingsScreenStyles.usernameText}>@{username}</Text>

            <View style={ProfileSettingsScreenStyles.badgeRow}>
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
                  CSE Student
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
              <TextInput
                value={name}
                onChangeText={setName}
                style={ProfileSettingsScreenStyles.rowInput}
                placeholderTextColor={COLORS.textSecondary}
              />
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
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={ProfileSettingsScreenStyles.rowInput}
                placeholderTextColor={COLORS.textSecondary}
              />
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
              onPress={() => console.log('Navigate to Change Password')}
            >
              <View style={ProfileSettingsScreenStyles.rowIconContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} />
              </View>
              <Text style={[ProfileSettingsScreenStyles.rowLabel, { flex: 1 }]}>Password</Text>
              <Text style={{ color: COLORS.textSecondary, fontSize: 14 }}>
                Last changed 30d ago
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
              value={preferences}
              onChangeText={setPreferences}
              scrollEnabled={true}
            />
          </View>

          {/* 5. Save Button */}
          <AppButton
            title="Save Changes"
            onPress={() => console.log('Save')}
            style={ProfileSettingsScreenStyles.actionButton}
            variant="primary"
          />

          {/* FIX: Extra spacer view to forcefully push scroll limits down */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;
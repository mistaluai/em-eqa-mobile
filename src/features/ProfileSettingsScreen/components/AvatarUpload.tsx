import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { AvatarUploadStyles } from '../../../theme/styles/ProfileSettingsScreen/AvatarUploadStyle';

interface AvatarUploadProps {
  onPress?: () => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ onPress }) => (
  <View style={AvatarUploadStyles.avatarContainer}>
    <Pressable onPress={onPress} style={AvatarUploadStyles.avatar}>
      <Ionicons name="person-circle-outline" size={100} color={COLORS.secondary} />
    </Pressable>
  </View>
);
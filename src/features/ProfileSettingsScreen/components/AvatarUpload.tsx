import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING } from '../../../theme/styles';

interface AvatarUploadProps {
  onPress?: () => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ onPress }) => (
  <View style={styles.avatarContainer}>
    <Pressable onPress={onPress} style={styles.avatar}>
      <Ionicons name="person-circle-outline" size={100} color={COLORS.secondary} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
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
    borderColor: COLORS.secondary,
    backgroundColor: `${COLORS.primary}33`,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
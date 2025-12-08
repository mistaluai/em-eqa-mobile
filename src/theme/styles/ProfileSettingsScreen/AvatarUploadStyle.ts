import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const AvatarUploadStyles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SPACING.s32,
  } as ViewStyle,
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
  } as ViewStyle,
});


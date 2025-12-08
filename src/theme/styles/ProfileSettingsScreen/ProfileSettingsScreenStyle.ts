import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const ProfileSettingsScreenStyles = StyleSheet.create({
  inputSpacer: {
    height: SPACING.s16,
  } as ViewStyle,
  triggerLabel: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  } as TextStyle,
  addButtonText: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  } as TextStyle,
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  } as TextStyle,
  bottomSpacer: {
    height: SPACING.s32,
  } as ViewStyle,
});


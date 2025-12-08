// src/theme/styles/global/INPUT_BAR.ts
import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const INPUT_BAR = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: SPACING.s16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.borderLight,
  } as ViewStyle,
  voiceButton: {
    padding: SPACING.s8,
  } as ViewStyle,
  pill: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    marginHorizontal: SPACING.s12,
    justifyContent: 'center' as const,
    paddingHorizontal: SPACING.s16,
    color: COLORS.textPrimary,
  } as ViewStyle,
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
} as const;


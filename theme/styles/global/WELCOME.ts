// src/theme/styles/global/WELCOME.ts
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const WELCOME = {
  area: {
    padding: SPACING.s24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderLight,
  } as ViewStyle,
  text: {
    marginBottom: SPACING.s16,
    fontWeight: '800' as const,
  } as TextStyle,
  menuButtonOverride: {
    position: 'absolute' as const,
    top: 0,
    left: SPACING.s16,
    width: 40,
    height: 40,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    zIndex: 100,
  } as ViewStyle,
} as const;


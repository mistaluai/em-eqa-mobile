// src/theme/styles/global/SECTION.ts
import { TextStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const SECTION = {
  title: {
    color: COLORS.textPrimary,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700' as const,
  } as TextStyle,
  titleWithTopMargin: {
    color: COLORS.textPrimary,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700' as const,
  } as TextStyle,
  titleNoTopMargin: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s12,
    fontWeight: '700' as const,
  } as TextStyle,
} as const;


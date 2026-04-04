// src/theme/typography.ts
import { TextStyle } from 'react-native';
import { COLORS } from './colors';

export const TYPOGRAPHY = {
  HeadlineXL: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    fontWeight: '600' as const,
    color: COLORS.textPrimary, 
    lineHeight: 40,
  },
  HeadlineL: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    fontWeight: '600' as const,
    color: COLORS.textPrimary,
    lineHeight: 36,
  },
  HeadlineM: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    fontWeight: '600' as const,
    color: COLORS.textPrimary,
    lineHeight: 32,
  },
  BodyL: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontWeight: '400' as const,
    color: COLORS.textPrimary,
    lineHeight: 28,
  },
  BodyM: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400' as const,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  Caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '400' as const,
    color: COLORS.textSecondary, 
    lineHeight: 20,
  },
} satisfies Record<string, TextStyle>;


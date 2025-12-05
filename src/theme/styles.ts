// src/theme/styles.ts
import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from './colors';

// ──────────────────────────────────────────────────
// SPACING – unchanged (perfect)
// ──────────────────────────────────────────────────
export const SPACING = {
  s4: 4,
  s8: 8,
  s12: 12,
  s16: 16,
  s20: 20,
  s24: 24,
  s32: 32,
} as const;

// ──────────────────────────────────────────────────
// RADIUS – unchanged (perfect)
// ──────────────────────────────────────────────────
export const RADIUS = {
  default: 12,
  large: 20,
  full: 999,
} as const;

// ──────────────────────────────────────────────────
// TYPOGRAPHY – fixed (no StyleSheet.create, added fontFamily + lineHeight)
// ──────────────────────────────────────────────────
export const TYPOGRAPHY = {
  HeadlineXL: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    fontWeight: '600' as const,
    color: COLORS.white,
    lineHeight: 40,
  },
  HeadlineL: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    fontWeight: '600' as const,
    color: COLORS.white,
    lineHeight: 36,
  },
  HeadlineM: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    fontWeight: '600' as const,
    color: COLORS.white,
    lineHeight: 32,
  },
  BodyL: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontWeight: '400' as const,
    color: COLORS.white,
    lineHeight: 28,
  },
  BodyM: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400' as const,
    color: COLORS.white,
    lineHeight: 24,
  },
  Caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '400' as const,
    color: COLORS.softGray,   // ← still using your softGray
    lineHeight: 20,
  },
} satisfies Record<string, TextStyle>;

// ──────────────────────────────────────────────────
// SHADOW – fixed (shadowColor must be #000, not your background)
// ──────────────────────────────────────────────────
export const SHADOW = {
  default: {
    shadowColor: '#000',          // ← Always black for real shadows
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
} satisfies Record<string, ViewStyle>;
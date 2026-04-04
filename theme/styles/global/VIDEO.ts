// src/theme/styles/global/VIDEO.ts
import { ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const VIDEO = {
  placeholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.large,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s24,
    ...SHADOW.default,
  } as ViewStyle,
  preview: {
    width: '90%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.large,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s32,
    ...SHADOW.default,
  } as ViewStyle,
  thumbnail: {
    width: 80,
    height: 50,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default / 2,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
} as const;


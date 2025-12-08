// src/theme/styles/global/PROGRESS.ts
import { ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const PROGRESS = {
  track: {
    height: SPACING.s8,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.large,
    marginTop: SPACING.s8,
    overflow: 'hidden' as const,
  } as ViewStyle,
  fill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  trackSmall: {
    height: SPACING.s4,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.full,
    marginTop: SPACING.s12,
    overflow: 'hidden' as const,
  } as ViewStyle,
  fillSmall: {
    height: '100%',
    borderRadius: RADIUS.full,
  } as ViewStyle,
} as const;


// src/theme/styles/global/PILL.ts
import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const PILL = {
  default: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: COLORS.borderLight,
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  filter: {
    paddingHorizontal: SPACING.s16,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.backgroundNeutral,
  } as ViewStyle,
  filterActive: {
    backgroundColor: COLORS.primary,
  } as ViewStyle,
  trigger: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: `${COLORS.primaryLight}50`,
    paddingVertical: SPACING.s8,
    paddingLeft: SPACING.s12,
    paddingRight: SPACING.s8,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  container: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  } as ViewStyle,
  text: {
    color: COLORS.secondary,
    marginLeft: SPACING.s4,
    fontWeight: '600' as const,
  } as TextStyle,
  filterText: {
    color: COLORS.textPrimary,
    fontWeight: '600' as const,
  } as TextStyle,
  filterTextActive: {
    color: COLORS.backgroundLight,
  } as TextStyle,
} as const;


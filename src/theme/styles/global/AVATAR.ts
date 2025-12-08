// src/theme/styles/global/AVATAR.ts
import { ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const AVATAR = {
  container: {
    alignItems: 'center' as const,
    marginBottom: SPACING.s32,
  } as ViewStyle,
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderStyle: 'dashed' as const,
    borderColor: COLORS.secondary,
    backgroundColor: `${COLORS.primaryLight}80`,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
  } as ViewStyle,
  photo: {
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderStyle: 'dashed' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...SHADOW.default,
  } as ViewStyle,
  floating: {
    position: 'absolute' as const,
    bottom: SPACING.s24,
    right: SPACING.s24,
    backgroundColor: COLORS.primary,
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...SHADOW.default,
  } as ViewStyle,
} as const;


// src/theme/styles/global/BUTTON.ts
import { ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const BUTTON = {
  delete: {
    width: '100%',
    marginTop: SPACING.s12,
  } as ViewStyle,
  reconnect: {
    width: '100%',
  } as ViewStyle,
  voice: {
    padding: SPACING.s8,
  } as ViewStyle,
  send: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  add: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...SHADOW.default,
  } as ViewStyle,
  skip: {
    paddingVertical: SPACING.s8,
  } as ViewStyle,
  evaluation: {
    alignSelf: 'flex-start' as const,
    paddingVertical: SPACING.s12,
  } as ViewStyle,
} as const;


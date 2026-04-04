// src/theme/styles/global/STATUS.ts
import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const STATUS = {
  card: {
    width: '100%',
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  } as ViewStyle,
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  dot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    marginRight: SPACING.s8,
  } as ViewStyle,
  deviceName: {
    color: COLORS.textSecondary,
    marginLeft: SPACING.s16,
    flex: 1,
    textAlign: 'right' as const,
  } as TextStyle,
} as const;


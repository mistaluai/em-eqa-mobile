// src/theme/styles/global/TRIGGER_HEADER.ts
import { ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const TRIGGER_HEADER = {
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s16,
  } as ViewStyle,
} as const;


// src/theme/styles/global/SLIDER.ts
import { ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const SLIDER = {
  labels: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: SPACING.s8,
  } as ViewStyle,
} as const;


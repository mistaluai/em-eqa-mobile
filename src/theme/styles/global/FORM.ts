// src/theme/styles/global/FORM.ts
import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';

export const FORM = {
  container: {
    width: '100%',
  } as ViewStyle,
  row: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  forgotPassword: {
    color: COLORS.secondary,
    textAlign: 'right' as const,
    fontWeight: '600' as const,
  } as TextStyle,
  link: {
    color: COLORS.secondary,
    textDecorationLine: 'underline' as const,
    fontWeight: '600' as const,
  } as TextStyle,
} as const;


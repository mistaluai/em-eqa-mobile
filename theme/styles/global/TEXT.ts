// src/theme/styles/global/TEXT.ts
import { TextStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const createTextStyles = (COLORS: any) => ({
  title: {
    color: COLORS.textPrimary,
    alignSelf: 'flex-start' as const,
    fontWeight: '800' as const,
  } as TextStyle,
  signup: {
    color: COLORS.textPrimary,
    textAlign: 'center' as const,
  } as TextStyle,
  signupLink: {
    color: COLORS.primary,
    fontWeight: '700' as const,
  } as TextStyle,
  login: {
    color: COLORS.textSecondary,
    textAlign: 'center' as const,
  } as TextStyle,
  forgotPassword: {
    color: COLORS.textSecondary,
    textAlign: 'right' as const,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
  eventTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s16,
    fontWeight: '800' as const,
  } as TextStyle,
  retryAll: {
    color: COLORS.warning,
    textDecorationLine: 'underline' as const,
    textAlign: 'right' as const,
    marginTop: SPACING.s8,
    fontWeight: '600' as const,
  } as TextStyle,
  clearAll: {
    color: COLORS.primary,
    textDecorationLine: 'underline' as const,
    textAlign: 'right' as const,
    marginTop: SPACING.s8,
    fontWeight: '600' as const,
  } as TextStyle,
  sectionTitle: {
    marginBottom: SPACING.s12,
    marginTop: SPACING.s16,
    fontWeight: '700' as const,
  } as TextStyle,
  changePassword: {
    color: COLORS.primary,
    textDecorationLine: 'underline' as const,
    fontWeight: '600' as const,
    paddingLeft: 222,
  } as TextStyle,
});

import { lightTheme } from '../../colors';
export const TEXT = createTextStyles(lightTheme);


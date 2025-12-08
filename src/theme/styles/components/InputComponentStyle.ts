import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';
import { TYPOGRAPHY } from '../../typography';

export const InputComponentStyles = StyleSheet.create({
  container: {
    width: '100%',
  } as ViewStyle,
  label: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
    fontWeight: '600',
  } as TextStyle,
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    paddingHorizontal: SPACING.s16,
    height: 56,
  } as ViewStyle,
  input: {
    flex: 1,
    ...TYPOGRAPHY.BodyM,
    color: COLORS.textPrimary,
    height: '100%',
    paddingVertical: 0,
  } as TextStyle,
  toggleButton: {
    paddingLeft: SPACING.s12,
  } as ViewStyle,
  errorBorder: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
  } as ViewStyle,
  focusBorder: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  } as ViewStyle,
  errorText: {
    color: COLORS.secondary,
    marginTop: SPACING.s4,
  } as TextStyle,
});


import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const AppButtonStyles = StyleSheet.create({
  baseButton: {
    paddingVertical: SPACING.s16,
    paddingHorizontal: SPACING.s24,
    borderRadius: RADIUS.default,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  primaryButton: {
    // Shadow can be applied inline when needed
  } as ViewStyle,
  secondaryButton: {
    // Border applied inline in component
  } as ViewStyle,
  primaryText: {
    color: COLORS.backgroundLight,
    fontWeight: '600',
  } as TextStyle,
  secondaryText: {
    fontWeight: '600',
    color: COLORS.backgroundLight,
  } as TextStyle,
  pressed: {
    opacity: 0.8,
  } as ViewStyle,
  disabled: {
    opacity: 0.5,
  } as ViewStyle,
});


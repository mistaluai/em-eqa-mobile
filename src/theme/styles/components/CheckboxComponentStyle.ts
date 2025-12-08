import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const CheckboxComponentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s8,
  } as ViewStyle,
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.default / 2,
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s12,
  } as ViewStyle,
  checkedBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  } as ViewStyle,
  label: {
    color: COLORS.textPrimary,
  } as TextStyle,
  disabled: {
    opacity: 0.5,
  } as ViewStyle,
  pressed: {
    opacity: 0.9,
  } as ViewStyle,
});


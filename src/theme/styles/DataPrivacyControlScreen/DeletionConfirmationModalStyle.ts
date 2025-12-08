import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const DeletionConfirmationModalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  } as ViewStyle,
  iconMargin: {
    marginBottom: SPACING.s16,
  } as ViewStyle,
  title: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
  } as TextStyle,
  bodyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.s24,
  } as TextStyle,
  deleteButton: {
    width: '100%',
    marginBottom: SPACING.s12,
  } as ViewStyle,
  cancelButton: {
    width: '100%',
  } as ViewStyle,
});


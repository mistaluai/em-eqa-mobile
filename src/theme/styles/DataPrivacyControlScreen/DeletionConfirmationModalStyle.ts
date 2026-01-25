import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const DeletionConfirmationModalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  } as ViewStyle,
  iconMargin: {
    marginBottom: SPACING.s16,
    // Note: In your Modal JSX, ensure the Icon color is set to COLORS.navPrivacy
  } as ViewStyle,
  title: {
    color: COLORS.navPrivacy, // Changed to Red to indicate Danger
    marginBottom: SPACING.s8,
    fontWeight: '700', // Added boldness for emphasis
  } as TextStyle,
  bodyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.s24,
  } as TextStyle,
  deleteButton: {
    width: '100%',
    marginBottom: SPACING.s12,
    backgroundColor: COLORS.navPrivacy, // Danger Red Background
    borderColor: COLORS.navPrivacy,
  } as ViewStyle,
  cancelButton: {
    width: '100%',
  } as ViewStyle,
});
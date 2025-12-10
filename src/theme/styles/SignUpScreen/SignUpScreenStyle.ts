import { StyleSheet, ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const SignUpScreenStyles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  } as ViewStyle,
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SPACING.s32,
  } as ViewStyle,
  photoContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  } as ViewStyle,
  spacer: {
    height: SPACING.s32,
  } as ViewStyle,
  formSpacer: {
    height: SPACING.s16,
  } as ViewStyle,
  titleSpacer: {
    height: SPACING.s32,
  } as ViewStyle,
  loginLinkSpacer: {
    height: SPACING.s24,
  } as ViewStyle,
});


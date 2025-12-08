import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const LoginScreenStyles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  } as ViewStyle,
  scrollContainer: {
    flex: 1,
  } as ViewStyle,
  logoContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  } as ViewStyle,
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  } as ImageStyle,
  title: {
    fontSize: 32,
  } as TextStyle,
  titleHidden: {
    visibility: 'hidden',
  } as TextStyle,
  formContainer: {
    width: '100%',
  } as ViewStyle,
  buttonSpacer: {
    height: SPACING.s32,
  } as ViewStyle,
  loginButton: {
    width: '90%',
  } as ViewStyle,
  signUpContainer: {
    marginTop: SPACING.s32,
  } as ViewStyle,
  signUpContainerKeyboard: {
    marginTop: SPACING.s16,
  } as ViewStyle,
});


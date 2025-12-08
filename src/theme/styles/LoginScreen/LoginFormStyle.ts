import { StyleSheet, ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const LoginFormStyles = StyleSheet.create({
  container: {
    width: '100%',
  } as ViewStyle,
  spacer: {
    height: SPACING.s16,
  } as ViewStyle,
  spacerSmall: {
    height: SPACING.s12,
  } as ViewStyle,
  signUpContainer: {
    marginTop: SPACING.s32,
    alignSelf: 'center',
  } as ViewStyle,
});


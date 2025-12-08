import { StyleSheet, ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const HomeScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  } as ViewStyle,
  keyboardAvoidingView: {
    flex: 1,
  } as ViewStyle,
  chatContainer: {
    flex: 1,
  } as ViewStyle,
  inputBarContainer: {
    marginBottom: 0,
  } as ViewStyle,
  inputBarContainerKeyboard: {
    marginBottom: SPACING.s12,
  } as ViewStyle,
});


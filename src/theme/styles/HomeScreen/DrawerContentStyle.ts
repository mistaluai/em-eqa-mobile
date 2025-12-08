import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const DrawerContentStyles = StyleSheet.create({
  closeButton: {
    padding: SPACING.s8,
  } as ViewStyle,
  spacer: {
    marginTop: 6,
  } as ViewStyle,
  logoutText: {
    marginLeft: SPACING.s12,
  } as TextStyle,
});


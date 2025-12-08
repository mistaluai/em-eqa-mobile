import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';

export const LogoPlaceholderStyles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.backgroundNeutral,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.default,
  } as ViewStyle,
  text: {
    color: COLORS.textPrimary,
    fontWeight: '800',
  } as TextStyle,
});


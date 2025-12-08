import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const AppCardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    padding: SPACING.s20,
  } as ViewStyle,
});


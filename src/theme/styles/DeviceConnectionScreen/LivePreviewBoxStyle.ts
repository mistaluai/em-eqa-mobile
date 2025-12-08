import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const LivePreviewBoxStyles = StyleSheet.create({
  container: {
    aspectRatio: (16 / 9) / 1.5,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s32,
  } as ViewStyle,
  text: {
    color: COLORS.textSecondary,
  } as ViewStyle,
  iconMargin: {
    marginTop: SPACING.s12,
  } as ViewStyle,
});


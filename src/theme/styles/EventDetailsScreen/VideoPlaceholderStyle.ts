import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const VideoPlaceholderStyles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: (16 / 9) / 1.25,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s24,
    ...SHADOW.default,
  } as ViewStyle,
});


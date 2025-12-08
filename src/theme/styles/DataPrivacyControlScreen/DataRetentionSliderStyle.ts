import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const DataRetentionSliderStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundNeutral,
  } as ViewStyle,
  title: {
    marginBottom: SPACING.s20,
  } as ViewStyle,
  highlightText: {
    fontWeight: '700',
  } as ViewStyle,
  slider: {
    width: '100%',
    height: 40,
  } as ViewStyle,
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.s8,
  } as ViewStyle,
  labelText: {
    fontWeight: '600',
  } as ViewStyle,
});


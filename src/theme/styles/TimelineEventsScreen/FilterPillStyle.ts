import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const FilterPillStyles = StyleSheet.create({
  filterPill: {
    paddingHorizontal: SPACING.s16,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.backgroundNeutral,
  } as ViewStyle,
  activeFilterPill: {
    backgroundColor: COLORS.primary,
  } as ViewStyle,
  filterText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  } as TextStyle,
  activeFilterText: {
    color: COLORS.backgroundLight,
  } as TextStyle,
});


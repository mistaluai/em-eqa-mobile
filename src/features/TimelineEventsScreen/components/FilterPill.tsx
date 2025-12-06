import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Filter } from '../../../shared/types';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface FilterPillProps {
  filter: Filter;
  activeFilter: Filter;
  onPress: (filter: Filter) => void;
}

export const FilterPill: React.FC<FilterPillProps> = ({ filter, activeFilter, onPress }) => (
  <Pressable
    onPress={() => onPress(filter)}
    style={[
      styles.filterPill,
      activeFilter === filter && styles.activeFilterPill,
    ]}
  >
    <Text style={[
      TYPOGRAPHY.Caption,
      styles.filterText,
      activeFilter === filter && styles.activeFilterText
    ]}>
      {filter}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  filterPill: {
    paddingHorizontal: SPACING.s16,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
    // UI CHANGE: Inactive pill background is now a soft gray/neutral background
    backgroundColor: COLORS.backgroundNeutral,
  },
  activeFilterPill: {
    // UI CHANGE: Active pill uses the primary color (ultraViolet alias)
    backgroundColor: COLORS.primary,
  },
  filterText: {
    // UI CHANGE: Inactive pill text is now medium gray (gray700 alias)
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeFilterText: {
    // UI CHANGE: Active pill text is now white (on the primary color)
    color: COLORS.backgroundLight,
  },
});
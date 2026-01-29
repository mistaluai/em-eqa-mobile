import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Filter } from '../../../shared/types';
import { TYPOGRAPHY } from '../../../theme';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { SPACING } from '../../../theme/spacing';

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
    backgroundColor: COLORS.backgroundNeutral,
  },
  activeFilterPill: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeFilterText: {
    color: COLORS.backgroundLight,
  },
});
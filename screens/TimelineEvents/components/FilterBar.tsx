import { SPACING } from '@/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Filter } from '../../../shared/types';
import { FilterPill } from './FilterPill';

interface FilterBarProps {
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FILTERS: Filter[] = ['Today', 'Week', 'All'];

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => (
  <View style={styles.filterBar}>
    {FILTERS.map((filter) => (
      <FilterPill
        key={filter}
        filter={filter}
        activeFilter={activeFilter}
        onPress={onFilterChange}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: SPACING.s16,
    marginHorizontal: 65,
    gap: SPACING.s12,
    alignContent: 'center',
  },
});
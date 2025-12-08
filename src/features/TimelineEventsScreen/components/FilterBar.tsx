import React from 'react';
import { View } from 'react-native';
import { Filter } from '../../../shared/types';
import { FilterBarStyles } from '../../../theme/styles/TimelineEventsScreen/FilterBarStyle';
import { FilterPill } from './FilterPill';

interface FilterBarProps {
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FILTERS: Filter[] = ['Today', 'Week', 'All'];

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => (
  <View style={FilterBarStyles.filterBar}>
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


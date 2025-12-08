import React from 'react';
import { Pressable, Text } from 'react-native';
import { Filter } from '../../../shared/types';
import { FilterPillStyles } from '../../../theme/styles/TimelineEventsScreen/FilterPillStyle';
import { TYPOGRAPHY } from '../../../theme';

interface FilterPillProps {
  filter: Filter;
  activeFilter: Filter;
  onPress: (filter: Filter) => void;
}

export const FilterPill: React.FC<FilterPillProps> = ({ filter, activeFilter, onPress }) => (
  <Pressable
    onPress={() => onPress(filter)}
    style={[
      FilterPillStyles.filterPill,
      activeFilter === filter && FilterPillStyles.activeFilterPill,
    ]}
  >
    <Text style={[
      TYPOGRAPHY.Caption,
      FilterPillStyles.filterText,
      activeFilter === filter && FilterPillStyles.activeFilterText
    ]}>
      {filter}
    </Text>
  </Pressable>
);
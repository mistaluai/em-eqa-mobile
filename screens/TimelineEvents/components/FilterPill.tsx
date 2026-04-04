import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Filter } from '../../../shared/types';

interface FilterPillProps {
  filter: Filter;
  activeFilter: Filter;
  onPress: (filter: Filter) => void;
}

export const FilterPill: React.FC<FilterPillProps> = ({ filter, activeFilter, onPress }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  return (
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
};

const createStyles = (COLORS: any) => StyleSheet.create({
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
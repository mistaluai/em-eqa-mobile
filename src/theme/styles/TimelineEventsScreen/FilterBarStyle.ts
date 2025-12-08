import { StyleSheet, ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const FilterBarStyles = StyleSheet.create({
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: SPACING.s16,
    marginHorizontal: 65,
    gap: SPACING.s12,
    alignContent: 'center',
  } as ViewStyle,
});


import { StyleSheet, ViewStyle } from 'react-native';
import { SPACING } from '../../spacing';

export const SystemStatusScreenStyles = StyleSheet.create({
  // New style for the ScrollView content
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.s24,
    paddingTop: SPACING.s24,
    paddingBottom: SPACING.s64, // Extra padding at bottom for scrolling past navigation/safe area
  } as ViewStyle,

  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.s12,
    marginBottom: SPACING.s8,
  } as ViewStyle,

  bottomSpacer: {
    height: SPACING.s32,
  } as ViewStyle,
});
// DataRetentionSliderStyle.ts
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const DataRetentionSliderStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundNeutral, // Soft Gray surface
    padding: SPACING.s16,
  } as ViewStyle,
  headerTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s4,
  } as TextStyle,
  helperText: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.s20,
  } as TextStyle,
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight, // White background for the track
    borderRadius: SPACING.s12,
    padding: SPACING.s4,
    gap: SPACING.s8, // Space between buttons
  } as ViewStyle,
  segmentButton: {
    flex: 1,
    paddingVertical: SPACING.s12,
    alignItems: 'center',
    borderRadius: SPACING.s8,
    borderWidth: 1,
    borderColor: 'transparent',
  } as ViewStyle,
  segmentButtonActive: {
    backgroundColor: COLORS.primary, // UltraViolet
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  } as ViewStyle,
  segmentText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  } as TextStyle,
  segmentTextActive: {
    color: COLORS.backgroundLight, // White Text
    fontWeight: '700',
  } as TextStyle,
});
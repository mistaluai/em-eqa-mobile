import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const StatusBarCardStyles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8, // Space between the small title and the card
    fontWeight: '700',
    fontSize: 14,
    marginLeft: SPACING.s4,
  } as TextStyle,

  statusCard: {
    // Ensure background matches your HUD theme (Neutral or Light)
    backgroundColor: COLORS.backgroundNeutral,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
    // FIX: This adds the space between this card and the next item in the list
    marginBottom: SPACING.s16,
  } as ViewStyle,

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  } as ViewStyle,

  textBlock: {
    flex: 1,
  } as ViewStyle,

  iconMargin: {
    marginRight: SPACING.s20,
  } as ViewStyle,

  progressText: {
    marginLeft: 'auto',
  } as TextStyle,

  progressBarTrack: {
    height: SPACING.s4,
    backgroundColor: `${COLORS.primaryLight}30`,
    borderRadius: RADIUS.full,
    marginTop: SPACING.s12,
    overflow: 'hidden',
  } as ViewStyle,

  progressBarFill: {
    height: '100%',
    borderRadius: RADIUS.full,
  } as ViewStyle,
});
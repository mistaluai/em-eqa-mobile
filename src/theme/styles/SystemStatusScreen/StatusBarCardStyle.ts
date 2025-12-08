import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const StatusBarCardStyles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s12,
    fontWeight: '700',
  } as TextStyle,
  statusCard: {
    backgroundColor: `${COLORS.primaryLight}33`,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
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


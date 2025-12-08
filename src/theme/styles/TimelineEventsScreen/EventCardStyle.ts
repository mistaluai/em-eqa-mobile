import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';
import { TYPOGRAPHY } from '../../typography';

export const EventCardStyles = StyleSheet.create({
  eventCardContainer: {
    marginBottom: SPACING.s16,
  } as ViewStyle,
  eventCard: {
    padding: SPACING.s16,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.backgroundNeutral,
  } as ViewStyle,
  headerSection: {
    marginBottom: SPACING.s12,
  } as ViewStyle,
  eventTitle: {
    ...TYPOGRAPHY.BodyL,
    color: COLORS.textPrimary,
    fontWeight: '700',
    lineHeight: 22,
  } as TextStyle,
  eventTime: {
    ...TYPOGRAPHY.BodyM,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: SPACING.s4,
  } as TextStyle,
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  } as ViewStyle,
  eventSummary: {
    ...TYPOGRAPHY.Caption,
    color: COLORS.textSecondary,
    flex: 1,
    paddingRight: SPACING.s16,
    lineHeight: 18,
  } as TextStyle,
  videoIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.default,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.s8,
  } as ViewStyle,
});


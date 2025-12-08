import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const EventMetadataStyles = StyleSheet.create({
  eventTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s16,
    fontWeight: '800',
  } as TextStyle,
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  } as ViewStyle,
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.secondary}30`,
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  pillText: {
    color: COLORS.textSecondary,
    marginLeft: SPACING.s4,
    fontWeight: '700',
  } as TextStyle,
});


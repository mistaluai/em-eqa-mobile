import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const TriggerPillStyles = StyleSheet.create({
  triggerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}20`,
    paddingVertical: SPACING.s8,
    paddingLeft: SPACING.s12,
    paddingRight: SPACING.s8,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  triggerText: {
    marginRight: SPACING.s4,
  } as ViewStyle,
});


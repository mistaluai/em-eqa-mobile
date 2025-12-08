import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const ConnectionStatusCardStyles = StyleSheet.create({
  statusCard: {
    width: '100%',
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  } as ViewStyle,
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    marginRight: SPACING.s8,
  } as ViewStyle,
  deviceName: {
    color: COLORS.textSecondary,
    marginLeft: SPACING.s16,
    flex: 1,
    textAlign: 'right',
  } as TextStyle,
  statusText: {
    fontWeight: '700',
  } as TextStyle,
  iconMargin: {
    marginRight: SPACING.s8,
  } as ViewStyle,
});


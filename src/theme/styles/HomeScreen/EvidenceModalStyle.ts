import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const EvidenceModalStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  } as ViewStyle,
  title: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s16,
    textAlign: 'center',
  } as TextStyle,
  videoPlaceholder: {
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s16,
  } as ViewStyle,
  summaryTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
  } as TextStyle,
  summaryText: {
    color: COLORS.textSecondary,
  } as TextStyle,
  cardSpacer: {
    marginTop: SPACING.s16,
  } as ViewStyle,
  buttonSpacer: {
    height: SPACING.s24,
  } as ViewStyle,
});


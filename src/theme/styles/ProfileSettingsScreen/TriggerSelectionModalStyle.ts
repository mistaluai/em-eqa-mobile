import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

const { height } = Dimensions.get('window');

export const TriggerSelectionModalStyles = StyleSheet.create({
  modalContent: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.s24,
  } as ViewStyle,
  modalTitle: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.s24,
    fontWeight: '700',
  } as TextStyle,
  triggerList: {
    maxHeight: height * 0.5,
    marginBottom: SPACING.s24,
  } as ViewStyle,
  triggerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.s12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderLight,
  } as ViewStyle,
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  } as ViewStyle,
});


import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const HeaderComponentStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: SPACING.s16,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderLight,
  } as ViewStyle,
  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: SPACING.s8,
    color: COLORS.textPrimary,
  } as TextStyle,
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  iconPlaceholder: {
    width: 40,
    height: 40,
  } as ViewStyle,
});


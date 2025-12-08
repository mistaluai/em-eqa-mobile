import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const NavigationHubScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  } as ViewStyle,
  listContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.default,
    marginTop: SPACING.s24,
    paddingHorizontal: SPACING.s16,
  } as ViewStyle,
});


import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const NavigationCardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.default,
    marginVertical: SPACING.s8,
    width: '100%',
    ...SHADOW.default,
  } as ViewStyle,
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.s16,
  } as ViewStyle,
  textContainer: {
    flex: 1,
    marginRight: SPACING.s10,
  } as ViewStyle,
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  } as TextStyle,
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.s2,
  } as TextStyle,
  chevron: {
    fontSize: 20,
    fontWeight: '300',
    color: COLORS.textSecondary,
    marginLeft: 'auto',
  } as TextStyle,
});


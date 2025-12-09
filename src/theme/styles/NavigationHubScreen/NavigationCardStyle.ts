import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const NavigationCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight, // Clean white background
    paddingVertical: SPACING.s16,
    paddingHorizontal: SPACING.s16,
    marginBottom: SPACING.s12,
    borderRadius: RADIUS.large,
    // Subtle border instead of heavy shadow for a modern look
    borderWidth: 1,
    borderColor: COLORS.backgroundNeutral,
  } as ViewStyle,

  cardPressed: {
    backgroundColor: COLORS.backgroundNeutral, // Feedback on press
    transform: [{ scale: 0.98 }], // Micro-interaction scale
  } as ViewStyle,

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.default, // Soft rounded square (squircle)
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s16,
  } as ViewStyle,

  textContainer: {
    flex: 1,
    justifyContent: 'center',
  } as ViewStyle,

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  } as TextStyle,

  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '400',
  } as TextStyle,

  chevronContainer: {
    marginLeft: SPACING.s8,
    opacity: 0.5,
  } as ViewStyle,
});
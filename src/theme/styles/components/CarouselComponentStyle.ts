import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const CarouselComponentStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50%',
  } as ViewStyle,
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: SPACING.s24 + 220,
    left: 0,
    right: 0,
    zIndex: 10,
    marginBottom: -SPACING.s128,
  } as ViewStyle,
  dot: {
    height: SPACING.s8,
    borderRadius: RADIUS.full,
    marginHorizontal: SPACING.s4,
    backgroundColor: COLORS.primary,
  } as ViewStyle,
});


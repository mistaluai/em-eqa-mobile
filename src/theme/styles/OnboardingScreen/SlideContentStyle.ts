import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

const { width } = Dimensions.get('window');

export const SlideContentStyles = StyleSheet.create({
  slide: {
    width: width,
    height: '100%',
    paddingHorizontal: SPACING.s32,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  placeholderBase: {
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.backgroundNeutral,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  } as ViewStyle,
  speechContainer: {
    alignItems: 'center',
  } as ViewStyle,
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: SPACING.s8,
  } as ViewStyle,
  slideTitle: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: SPACING.s32,
    marginBottom: SPACING.s12,
    fontWeight: '800',
  } as TextStyle,
  slideSubtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.s24,
  } as TextStyle,
  slideDescription: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  } as TextStyle,
});


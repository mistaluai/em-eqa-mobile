// src/theme/styles/global/ONBOARDING.ts
import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';
import { TYPOGRAPHY } from '../../typography';

export const ONBOARDING = {
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  } as ViewStyle,
  header: {
    height: 48,
    flexDirection: 'row' as const,
    justifyContent: 'flex-end' as const,
    paddingHorizontal: SPACING.s24,
    zIndex: 1,
  } as ViewStyle,
  skipButton: {
    paddingVertical: SPACING.s8,
  } as ViewStyle,
  skipText: {
    color: COLORS.textSecondary,
    fontWeight: '600' as const,
  } as TextStyle,
  bottomContainer: {
    height: 220,
    paddingHorizontal: SPACING.s32,
    paddingTop: SPACING.s20,
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: RADIUS.large,
    borderTopRightRadius: RADIUS.large,
    ...SHADOW.default,
  } as ViewStyle,
  slide: {
    width: '100%',
    height: '100%',
    paddingHorizontal: SPACING.s32,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  } as ViewStyle,
  slideContentTop: {
    flex: 1,
    width: '100%',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: 400,
  } as ViewStyle,
  slideContentBottom: {
    height: 160,
    width: '100%',
    alignItems: 'center' as const,
    marginBottom: SPACING.s32,
  } as ViewStyle,
  placeholderBase: {
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s24,
  } as ViewStyle,
  mockClip: {
    width: '35%',
    height: 50,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.default,
    marginTop: SPACING.s8,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  mockCardsContainer: {
    width: '100%',
    height: 150,
    padding: SPACING.s12,
    alignItems: 'flex-start' as const,
    flexDirection: 'row' as const,
    gap: SPACING.s24,
  } as ViewStyle,
  mockCard: {
    width: '60%',
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    padding: SPACING.s12,
    justifyContent: 'center' as const,
    ...SHADOW.default,
  } as ViewStyle,
  mockCardText: {
    ...TYPOGRAPHY.BodyM,
    color: COLORS.textPrimary,
  } as TextStyle,
  privacyList: {
    alignItems: 'flex-start' as const,
    marginTop: SPACING.s24,
  } as ViewStyle,
  privacyItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s12,
  } as ViewStyle,
  slideTitle: {
    color: COLORS.textPrimary,
    textAlign: 'center' as const,
    marginBottom: SPACING.s12,
    fontWeight: '800' as const,
  } as TextStyle,
  slideSubtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center' as const,
    marginBottom: SPACING.s24,
  } as TextStyle,
  slideDescription: {
    color: COLORS.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 22,
  } as TextStyle,
  guestText: {
    color: COLORS.textSecondary,
    textAlign: 'center' as const,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
} as const;


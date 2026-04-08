// src/theme/styles/global/CARD.ts
import { Platform, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const createCardStyles = (COLORS: any) => ({
  default: {
    backgroundColor: COLORS.backgroundNeutral,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  mini: {
    flex: 1,
    padding: SPACING.s16,
    borderRadius: RADIUS.default,
    alignItems: 'center' as const,
  } as ViewStyle,
  status: {
    backgroundColor: COLORS.backgroundNeutral,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  clip: {
    backgroundColor: COLORS.backgroundNeutral,
    marginBottom: SPACING.s12,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  event: {
    padding: SPACING.s16,
    backgroundColor: COLORS.backgroundNeutral,
  } as ViewStyle,
  summary: {
    backgroundColor: COLORS.backgroundNeutral,
  } as ViewStyle,
  trigger: {
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  row: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  content: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    minHeight: 60,
  } as ViewStyle,
  textBlock: {
    flex: 1,
  } as ViewStyle,
  navigationItem: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.default,
    marginVertical: SPACING.s8,
    width: '100%',
    ...SHADOW.default,
  } as ViewStyle,
  navigationItemContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: SPACING.s16,
  } as ViewStyle,
  navigationIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: SPACING.s16,
    flexShrink: 0,
  } as ViewStyle,
  navigationIcon: {
    fontSize: 22,
    color: COLORS.backgroundLight,
    marginTop: Platform.OS === 'ios' ? 2 : 0,
  } as TextStyle,
  navigationTextContainer: {
    flex: 1,
    marginRight: SPACING.s10,
  } as ViewStyle,
  navigationTitle: {
    color: COLORS.textPrimary,
    fontWeight: '600' as const,
  } as TextStyle,
  navigationDescription: {
    color: COLORS.textSecondary,
    marginTop: SPACING.s2,
  } as TextStyle,
  navigationChevron: {
    fontSize: 20,
    fontWeight: '300' as const,
    color: COLORS.textSecondary,
    marginLeft: 'auto' as const,
  } as TextStyle,
});

import { lightTheme } from '../../colors';
export const CARD = createCardStyles(lightTheme);


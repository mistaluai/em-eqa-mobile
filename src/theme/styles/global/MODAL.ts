// src/theme/styles/global/MODAL.ts
import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const MODAL = {
  content: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.s24,
  } as ViewStyle,
  title: {
    color: COLORS.textPrimary,
    textAlign: 'center' as const,
    marginBottom: SPACING.s24,
    fontWeight: '700' as const,
  } as ViewStyle,
  triggerList: {
    maxHeight: 500,
    marginBottom: SPACING.s24,
  } as ViewStyle,
  triggerItem: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
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
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  } as ViewStyle,
  videoPlaceholder: {
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.default,
    height: 200,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s16,
  } as ViewStyle,
  container: {
    alignItems: 'center' as const,
  } as ViewStyle,
} as const;


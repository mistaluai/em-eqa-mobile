// src/theme/styles/global/LIST.ts
import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const LIST = {
  content: {
    paddingBottom: SPACING.s24,
  } as ViewStyle,
  filterBar: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-start' as const,
    marginVertical: SPACING.s16,
    gap: SPACING.s12,
  } as ViewStyle,
  eventCardContainer: {
    marginBottom: SPACING.s16,
  } as ViewStyle,
  timeTitleRow: {
    flexDirection: 'row' as const,
    marginBottom: SPACING.s12,
    alignItems: 'center' as const,
  } as ViewStyle,
  summaryRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  } as ViewStyle,
  summaryBox: {
    flex: 1,
    paddingRight: SPACING.s16,
  } as ViewStyle,
  eventTime: {
    color: COLORS.secondary,
    fontWeight: '700' as const,
    marginRight: SPACING.s16,
  } as TextStyle,
  eventTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700' as const,
    flex: 1,
  } as TextStyle,
} as const;


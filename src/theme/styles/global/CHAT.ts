// src/theme/styles/global/CHAT.ts
import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const CHAT = {
  container: {
    flex: 1,
    paddingHorizontal: SPACING.s16,
    paddingTop: SPACING.s16,
  } as ViewStyle,
  history: {
    flexGrow: 1,
  } as ViewStyle,
  messageRow: {
    maxWidth: '80%',
    marginVertical: SPACING.s4,
  } as ViewStyle,
  messageRowUser: {
    alignSelf: 'flex-end' as const,
  } as ViewStyle,
  messageRowAI: {
    alignSelf: 'flex-start' as const,
  } as ViewStyle,
  bubble: {
    padding: SPACING.s12,
    borderRadius: RADIUS.default,
  } as ViewStyle,
  bubbleUser: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: SPACING.s4,
  } as ViewStyle,
  bubbleAI: {
    backgroundColor: COLORS.backgroundNeutral,
    borderBottomLeftRadius: SPACING.s4,
  } as ViewStyle,
  textUser: {
    color: COLORS.backgroundLight,
  } as TextStyle,
  textAI: {
    color: COLORS.textPrimary,
  } as TextStyle,
  evidenceButton: {
    marginTop: SPACING.s8,
    alignSelf: 'flex-end' as const,
  } as ViewStyle,
  evidenceText: {
    color: COLORS.primary,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
} as const;


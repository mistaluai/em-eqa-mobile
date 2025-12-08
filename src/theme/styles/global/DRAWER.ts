// src/theme/styles/global/DRAWER.ts
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const DRAWER = {
  container: {
    width: '100%',
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.s24,
    position: 'absolute' as const,
    direction: 'ltr' as const,
  } as ViewStyle,
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s32,
    paddingTop: SPACING.s12,
  } as ViewStyle,
  item: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: SPACING.s16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderDark,
  } as ViewStyle,
  itemText: {
    color: COLORS.textPrimary,
    marginLeft: SPACING.s12,
    fontWeight: '600' as const,
  } as TextStyle,
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  } as ViewStyle,
  drawerContainer: {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.backgroundLight,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  } as ViewStyle,
} as const;


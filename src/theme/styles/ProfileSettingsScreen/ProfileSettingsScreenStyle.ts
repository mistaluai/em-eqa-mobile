import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const ProfileSettingsScreenStyles = StyleSheet.create({
  // Main Background
  screenBackground: {
    backgroundColor: COLORS.backgroundNeutral,
    flex: 1,
  } as ViewStyle,

  contentContainer: {
    paddingHorizontal: SPACING.s20,
    paddingTop: SPACING.s24,
    paddingBottom: 160, // Keep large padding for scrolling
    flexGrow: 1,
  } as ViewStyle,

  // --- Header Section ---
  headerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.s32,
    marginTop: SPACING.s8,
  } as ViewStyle,

  avatarWrapper: {
    position: 'relative',
    marginBottom: SPACING.s16,
    elevation: 2,
  } as ViewStyle,

  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.backgroundNeutral,
  } as ViewStyle,

  nameText: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  } as TextStyle,

  usernameText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: SPACING.s12,
  } as TextStyle,

  // --- Badges ---
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.s8,
    marginTop: SPACING.s4,
  } as ViewStyle,

  infoBadge: {
    backgroundColor: '#E5E5EA',
    paddingHorizontal: SPACING.s12,
    paddingVertical: 4,
    borderRadius: 6,
  } as ViewStyle,

  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  } as TextStyle,

  // --- Section Labels ---
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: SPACING.s4,
    marginBottom: SPACING.s8,
    marginTop: SPACING.s24,
  } as TextStyle,

  // --- Grouped Settings Container ---
  settingsGroup: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    // FIX: Ensure no flex is applied here
    flexGrow: 0,
  } as ViewStyle,

  // --- Row Item ---
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s16,
    paddingHorizontal: SPACING.s16,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  } as ViewStyle,

  lastRow: {
    borderBottomWidth: 0,
  } as ViewStyle,

  rowIconContainer: {
    width: 32,
    alignItems: 'flex-start',
  } as ViewStyle,

  rowLabel: {
    width: 100,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  } as TextStyle,

  rowInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'right',
    padding: 0,
  } as TextStyle,

  chevron: {
    marginLeft: SPACING.s8,
    opacity: 0.3,
  } as TextStyle,

  // --- Text Area (FIXED HERE) ---
  textAreaContainer: {
    padding: SPACING.s16,
    height: 120, // FIX: Enforce fixed height so it doesn't take full screen
  } as ViewStyle,

  textAreaInput: {
    fontSize: 16,
    color: COLORS.textPrimary,
    lineHeight: 24,
    textAlignVertical: 'top',
    flex: 1, // Fill the fixed container
  } as TextStyle,

  actionButton: {
    marginTop: SPACING.s32,
  } as ViewStyle,
});
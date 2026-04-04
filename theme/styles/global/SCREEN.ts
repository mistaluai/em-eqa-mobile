// src/theme/styles/global/SCREEN.ts
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SHADOW } from '../../shadow';
import { SPACING } from '../../spacing';

export const SCREEN = {
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  } as ViewStyle,
  container: {
    flex: 1,
    padding: SPACING.s24,
  } as ViewStyle,
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.s32,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginTop: SPACING.s16,
  } as ViewStyle,
  containerCentered: {
    flex: 1,
    padding: SPACING.s24,
    alignItems: 'center' as const,
  } as ViewStyle,
  loginTopSpacer: {
    flex: 1,
    minHeight: 60,
  } as ViewStyle,
  loginLogoSpacer: {
    height: SPACING.s32 + 8,
  } as ViewStyle,
  loginTitleSpacer: {
    height: SPACING.s32 + 16,
  } as ViewStyle,
  loginFormContainer: {
    width: '100%',
  } as ViewStyle,
  loginButtonSpacer: {
    height: SPACING.s32,
  } as ViewStyle,
  loginButton: {
    width: '90%',
    backgroundColor: COLORS.primary,
  } as ViewStyle,
  loginBottomSpacer: {
    height: SPACING.s32 * 2,
  } as ViewStyle,
  signUpTopSpacer: {
    flex: 0.5,
    minHeight: 20,
  } as ViewStyle,
  signUpPhotoSpacer: {
    height: SPACING.s32 + 16,
  } as ViewStyle,
  signUpTitleSpacer: {
    height: SPACING.s32 + 16,
  } as ViewStyle,
  signUpFormContainer: {
    width: '100%',
  } as ViewStyle,
  signUpButton: {
    width: '90%',
    backgroundColor: COLORS.primary,
  } as ViewStyle,
  signUpBottomSpacer: {
    flex: 1,
    minHeight: 20,
  } as ViewStyle,
  homeInputBarContainer: {
    marginBottom: 10,
    paddingBottom: 15,
  } as ViewStyle,
  profileChangePasswordLink: {
    alignSelf: 'flex-start' as const,
    marginTop: SPACING.s12,
  } as ViewStyle,
  timelineContainer: {
    flex: 1,
    paddingHorizontal: SPACING.s24,
  } as ViewStyle,
  systemStatusContainer: {
    padding: SPACING.s24,
    gap: SPACING.s32,
  } as ViewStyle,
  deviceConnectionContainer: {
    flex: 1,
    padding: SPACING.s24,
    alignItems: 'center' as const,
  } as ViewStyle,
  deviceReconnectButton: {
    width: '80%',
    borderColor: COLORS.primary,
    borderWidth: 2,
    marginTop: SPACING.s16,
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.s24,
    paddingHorizontal: SPACING.s12,
  } as ViewStyle,
  dataPrivacyDeleteButton: {
    width: '90%',
    marginTop: SPACING.s12,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    marginHorizontal: SPACING.s20,
  } as ViewStyle,
  navigationHubScrollContent: {
    padding: SPACING.s16,
    paddingBottom: SPACING.s40,
  } as ViewStyle,
  navigationHubListContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.default,
    ...SHADOW.default,
    overflow: 'hidden' as const,
  } as ViewStyle,
  navigationHubHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: SPACING.s16,
    paddingTop: SPACING.s16,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderLight,
  } as ViewStyle,
  navigationHubBackButton: {
    width: 30,
    height: 30,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  navigationHubBackText: {
    fontSize: 24,
    color: COLORS.textSecondary,
  } as TextStyle,
  navigationHubHeaderSpacer: {
    width: 30,
  } as ViewStyle,
  navigationHubSectionTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: COLORS.textPrimary,
    marginBottom: SPACING.s16,
  } as TextStyle,
  navigationHubSeparator: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: SPACING.s16,
  } as ViewStyle,
} as const;


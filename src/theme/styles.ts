// src/theme/styles.ts
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
// Note: Assuming the COLORS file is now logically configured for Light UI
// e.g., COLORS.textPrimary = '#1A1A1A', COLORS.backgroundLight = '#FFFFFF'
import { COLORS } from './colors';

// ──────────────────────────────────────────────────
// SPACING
// ──────────────────────────────────────────────────
export const SPACING = {
  s4: 4,
  s8: 8,
  s12: 12,
  s16: 16,
  s20: 20,
  s24: 24,
  s32: 32,
} as const;

// ──────────────────────────────────────────────────
// RADIUS
// ──────────────────────────────────────────────────
export const RADIUS = {
  default: 12,
  large: 20,
  full: 999,
} as const;

// ──────────────────────────────────────────────────
// TYPOGRAPHY
// ──────────────────────────────────────────────────
export const TYPOGRAPHY = {
  HeadlineXL: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    fontWeight: '600' as const,
    color: COLORS.textPrimary, 
    lineHeight: 40,
  },
  HeadlineL: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    fontWeight: '600' as const,
    color: COLORS.textPrimary,
    lineHeight: 36,
  },
  HeadlineM: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    fontWeight: '600' as const,
    color: COLORS.textPrimary,
    lineHeight: 32,
  },
  BodyL: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontWeight: '400' as const,
    color: COLORS.textPrimary,
    lineHeight: 28,
  },
  BodyM: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400' as const,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  Caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '400' as const,
    color: COLORS.textSecondary, 
    lineHeight: 20,
  },
} satisfies Record<string, TextStyle>;

// ──────────────────────────────────────────────────
// SHADOW
// ──────────────────────────────────────────────────
export const SHADOW = {
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
} satisfies Record<string, ViewStyle>;

// ──────────────────────────────────────────────────
// SCREEN LAYOUTS
// ──────────────────────────────────────────────────
export const SCREEN = {
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight, // Light UI background
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
  } as ViewStyle,
  containerCentered: {
    flex: 1,
    padding: SPACING.s24,
    alignItems: 'center' as const,
  } as ViewStyle,
  // Login Screen specific styles
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
  // SignUp Screen specific styles
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
  // Home Screen specific styles
  homeInputBarContainer: {
    marginBottom: 10,
    paddingBottom: 15,
  } as ViewStyle,
  // Profile Settings Screen specific styles
  profileChangePasswordLink: {
    alignSelf: 'flex-start' as const,
    marginTop: SPACING.s12,
  } as ViewStyle,
  // Timeline Events Screen specific styles
  timelineContainer: {
    flex: 1,
    paddingHorizontal: SPACING.s24,
  } as ViewStyle,
  // System Status Screen specific styles
  systemStatusContainer: {
    padding: SPACING.s24,
    gap: SPACING.s32,
  } as ViewStyle,
  // Device Connection Screen specific styles
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
  // Data Privacy Control Screen specific styles
  dataPrivacyDeleteButton: {
    width: '90%',
    marginTop: SPACING.s12,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    marginHorizontal: SPACING.s20,
  } as ViewStyle,
} as const;

// ──────────────────────────────────────────────────
// SECTION STYLES
// ──────────────────────────────────────────────────
export const SECTION = {
  title: {
    color: COLORS.textPrimary,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700' as const,
  } as TextStyle,
  titleWithTopMargin: {
    color: COLORS.textPrimary,
    marginTop: SPACING.s32,
    marginBottom: SPACING.s16,
    fontWeight: '700' as const,
  } as TextStyle,
  titleNoTopMargin: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s12,
    fontWeight: '700' as const,
  } as TextStyle,
} as const;

// ──────────────────────────────────────────────────
// CARDS
// ──────────────────────────────────────────────────
export const CARD = {
  default: {
    backgroundColor: COLORS.backgroundNeutral, // Soft gray card background
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  mini: {
    flex: 1,
    padding: SPACING.s16,
    borderRadius: RADIUS.default,
    alignItems: 'center' as const,
    //...SHADOW.default,
  } as ViewStyle,
  status: {
    backgroundColor: COLORS.backgroundNeutral, // Soft gray card background
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
} as const;

// ──────────────────────────────────────────────────
// PROGRESS BARS
// ──────────────────────────────────────────────────
export const PROGRESS = {
  track: {
    height: SPACING.s8,
    backgroundColor: COLORS.borderLight, // Light gray track
    borderRadius: RADIUS.large,
    marginTop: SPACING.s8,
    overflow: 'hidden' as const,
  } as ViewStyle,
  fill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  trackSmall: {
    height: SPACING.s4,
    backgroundColor: COLORS.borderLight, // Light gray track
    borderRadius: RADIUS.full,
    marginTop: SPACING.s12,
    overflow: 'hidden' as const,
  } as ViewStyle,
  fillSmall: {
    height: '100%',
    borderRadius: RADIUS.full,
  } as ViewStyle,
} as const;

// ──────────────────────────────────────────────────
// PILLS / BADGES
// ──────────────────────────────────────────────────
export const PILL = {
  default: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: COLORS.borderLight, // Subtle background
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  filter: {
    paddingHorizontal: SPACING.s16,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.backgroundNeutral,
  } as ViewStyle,
  filterActive: {
    backgroundColor: COLORS.primary,
  } as ViewStyle,
  trigger: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: `${COLORS.primaryLight}50`, 
    paddingVertical: SPACING.s8,
    paddingLeft: SPACING.s12,
    paddingRight: SPACING.s8,
    borderRadius: RADIUS.large,
  } as ViewStyle,
  container: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  } as ViewStyle,
  text: {
    color: COLORS.secondary, // Accent color for text
    marginLeft: SPACING.s4,
    fontWeight: '600' as const,
  } as TextStyle,
  filterText: {
    color: COLORS.textPrimary, // Dark text
    fontWeight: '600' as const,
  } as TextStyle,
  filterTextActive: {
    color: COLORS.backgroundLight, // White text on primary background
  } as TextStyle,
} as const;

// ──────────────────────────────────────────────────
// BUTTONS
// ──────────────────────────────────────────────────
export const BUTTON = {
  delete: {
    width: '100%',
    marginTop: SPACING.s12,
  } as ViewStyle,
  reconnect: {
    width: '100%',
  } as ViewStyle,
  voice: {
    padding: SPACING.s8,
  } as ViewStyle,
  send: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  add: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...SHADOW.default,
  } as ViewStyle,
  skip: {
    paddingVertical: SPACING.s8,
  } as ViewStyle,
  evaluation: {
    alignSelf: 'flex-start' as const,
    paddingVertical: SPACING.s12,
  } as ViewStyle,
} as const;

// ──────────────────────────────────────────────────
// FORMS
// ──────────────────────────────────────────────────
export const FORM = {
  container: {
    width: '100%',
  } as ViewStyle,
  row: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  forgotPassword: {
    color: COLORS.secondary, 
    textAlign: 'right' as const,
    fontWeight: '600' as const,
  } as TextStyle,
  link: {
    color: COLORS.secondary, 
    textDecorationLine: 'underline' as const,
    fontWeight: '600' as const,
  } as TextStyle,
} as const;

// ──────────────────────────────────────────────────
// INPUT BARS
// ──────────────────────────────────────────────────
export const INPUT_BAR = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: SPACING.s16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.borderLight, // Light border
  } as ViewStyle,
  voiceButton: {
    padding: SPACING.s8,
  } as ViewStyle,
  pill: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.backgroundNeutral, // Soft gray input background
    borderRadius: RADIUS.large,
    marginHorizontal: SPACING.s12,
    justifyContent: 'center' as const,
    paddingHorizontal: SPACING.s16,
    color: COLORS.textPrimary,
  } as ViewStyle,
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
} as const;

// ──────────────────────────────────────────────────
// AVATAR / PHOTO UPLOAD
// ──────────────────────────────────────────────────
export const AVATAR = {
  container: {
    alignItems: 'center' as const,
    marginBottom: SPACING.s32,
  } as ViewStyle,
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderStyle: 'dashed' as const,
    borderColor: COLORS.secondary,
    backgroundColor: `${COLORS.primaryLight}80`, 
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
  } as ViewStyle,
  photo: {
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderStyle: 'dashed' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...SHADOW.default,
  } as ViewStyle,
  floating: {
    position: 'absolute' as const,
    bottom: SPACING.s24,
    right: SPACING.s24,
    backgroundColor: COLORS.primary,
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...SHADOW.default,
  } as ViewStyle,
} as const;

// ──────────────────────────────────────────────────
// CHAT MESSAGES
// ──────────────────────────────────────────────────
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
    backgroundColor: COLORS.backgroundNeutral, // Light bubble background
    borderBottomLeftRadius: SPACING.s4,
  } as ViewStyle,
  textUser: {
    color: COLORS.backgroundLight, // White text on primary bubble
  } as TextStyle,
  textAI: {
    color: COLORS.textPrimary, // Dark text on light bubble
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

// ──────────────────────────────────────────────────
// DRAWER
// ──────────────────────────────────────────────────
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
  // Search Drawer specific styles
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

// ──────────────────────────────────────────────────
// MODALS
// ──────────────────────────────────────────────────
export const MODAL = {
  content: {
    backgroundColor: COLORS.backgroundLight, // Light modal background
    borderRadius: RADIUS.large,
    padding: SPACING.s24,
  } as ViewStyle,
  title: {
    color: COLORS.textPrimary, // Dark title
    textAlign: 'center' as const,
    marginBottom: SPACING.s24,
    fontWeight: '700' as const,
  } as TextStyle,
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
    borderBottomColor: COLORS.borderLight, // Light border
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
    backgroundColor: COLORS.borderLight, // Light background for placeholder
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

// ──────────────────────────────────────────────────
// VIDEO / PREVIEW
// ──────────────────────────────────────────────────
export const VIDEO = {
  placeholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.borderLight, // Light background for placeholder
    borderRadius: RADIUS.large,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s24,
    ...SHADOW.default,
  } as ViewStyle,
  preview: {
    width: '90%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.borderLight, // Light background for placeholder
    borderRadius: RADIUS.large,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s32,
    ...SHADOW.default,
  } as ViewStyle,
  thumbnail: {
    width: 80,
    height: 50,
    backgroundColor: COLORS.backgroundNeutral, // Soft gray background
    borderRadius: RADIUS.default / 2,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
} as const;

// ──────────────────────────────────────────────────
// STATUS
// ──────────────────────────────────────────────────
export const STATUS = {
  card: {
    width: '100%',
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  } as ViewStyle,
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  dot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    marginRight: SPACING.s8,
  } as ViewStyle,
  deviceName: {
    color: COLORS.textSecondary,
    marginLeft: SPACING.s16,
    flex: 1,
    textAlign: 'right' as const,
  } as TextStyle,
} as const;

// ──────────────────────────────────────────────────
// LISTS
// ──────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────
// ONBOARDING
// ──────────────────────────────────────────────────
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
    backgroundColor: COLORS.backgroundLight, // Light container background
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
    backgroundColor: COLORS.backgroundNeutral, // Soft gray card
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
  // skipText: {
  //   color: COLORS.textSecondary, 
  //   fontWeight: '600' as const,
  // } as TextStyle,
  guestText: {
    color: COLORS.textSecondary, 
    textAlign: 'center' as const,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
} as const;

// ──────────────────────────────────────────────────
// WELCOME / HOME
// ──────────────────────────────────────────────────
export const WELCOME = {
  area: {
    padding: SPACING.s24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderLight, // Light border
  } as ViewStyle,
  text: {
    marginBottom: SPACING.s16,
    fontWeight: '800' as const,
  } as TextStyle,
  menuButtonOverride: {
    position: 'absolute' as const,
    top: 0,
    left: SPACING.s16,
    width: 40,
    height: 40,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    zIndex: 100,
  } as ViewStyle,
} as const;

// ──────────────────────────────────────────────────
// TEXT STYLES
// ──────────────────────────────────────────────────
export const TEXT = {
  title: {
    color: COLORS.textPrimary, 
    alignSelf: 'flex-start' as const,
    fontWeight: '800' as const,
  } as TextStyle,
  signup: {
    color: COLORS.textPrimary, 
    textAlign: 'center' as const,
  } as TextStyle,
  signupLink: {
    color: COLORS.primary,
    fontWeight: '700' as const,
  } as TextStyle,
  login: {
    color: COLORS.textSecondary, 
    textAlign: 'center' as const,
  } as TextStyle,
  forgotPassword: {
    color: COLORS.textSecondary,
    textAlign: 'right' as const,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
  eventTitle: {
    color: COLORS.textPrimary, 
    marginBottom: SPACING.s16,
    fontWeight: '800' as const,
  } as TextStyle,
  retryAll: {
    color: COLORS.warning, 
    textDecorationLine: 'underline' as const,
    textAlign: 'right' as const,
    marginTop: SPACING.s8,
    fontWeight: '600' as const,
  } as TextStyle,
   clearAll: {
    color: COLORS.primary, 
    textDecorationLine: 'underline' as const,
    textAlign: 'right' as const,
    marginTop: SPACING.s8,
    fontWeight: '600' as const,
  } as TextStyle,
  sectionTitle: {
    marginBottom: SPACING.s12,
    marginTop: SPACING.s16,
    fontWeight: '700' as const,
  } as TextStyle,
  changePassword: {
    color: COLORS.primary,
    textDecorationLine: 'underline' as const,
    fontWeight: '600' as const,
    paddingLeft: 222,
  } as TextStyle,
} as const;

// ──────────────────────────────────────────────────
// TRIGGER HEADER
// ──────────────────────────────────────────────────
export const TRIGGER_HEADER = {
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: SPACING.s16,
  } as ViewStyle,
} as const;

// ──────────────────────────────────────────────────
// SLIDER
// ──────────────────────────────────────────────────
export const SLIDER = {
  labels: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: SPACING.s8,
  } as ViewStyle,
} as const;
// ──────────────────────────────────────────────────
// LOGIN SCREEN
// ──────────────────────────────────────────────────
export const LOGIN = {
  topSpacer: {
    flex: 1,
    minHeight: 60,
  } as ViewStyle,
  logoSpacer: {
    height: SPACING.s32 + 8,
  } as ViewStyle,
  titleSpacer: {
    height: SPACING.s32 + 16,
  } as ViewStyle,
  formContainer: {
    width: '100%',
  } as ViewStyle,
  buttonSpacer: {
    height: SPACING.s32,
  } as ViewStyle,
  button: {
    width: '90%',
    backgroundColor: COLORS.primary,
  } as ViewStyle,
  bottomSpacer: {
    height: SPACING.s32 * 2,
  } as ViewStyle,
} as const;

// ──────────────────────────────────────────────────
// SIDEBAR / SEARCH DRAWER
// ──────────────────────────────────────────────────
export const sidebarStyles = StyleSheet.create({
  // The content wrapper inside SafeAreaView
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  
  // Header and Search
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundNeutral, // White background for the search bar itself
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchBarInput: {
    flex: 1,
    color: COLORS.textPrimary, // Black text inside the white search bar
    padding: 0,
    borderColor: COLORS.borderLight,
  },
  searchIconPlaceholder: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconText: {
    fontSize: 18,
  },
  newChatText: {
    color: COLORS.primary, 
    fontWeight: '600',
  },
  
  // Chat History
  chatHistoryTitle: {
    color: COLORS.textPrimary, // Dark text color adapted for light background
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chatHistoryList: {
    flex: 1,
  },
  chatItem: {
    backgroundColor:COLORS.backgroundLight, // Light gray background for items on a light drawer
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  chatItemText: {
    color: COLORS.textSecondary, // Dark text color
    fontSize: 16,
    borderColor: COLORS.borderLight,
    borderWidth: 2,
    borderRadius: 12,
    padding: 8,
  },

  // User Profile
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark, // Light border for separation
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.secondary, // Vibrant Purple for the photo circle
    marginRight: 10,
  },
  userName: {
    color: '#333333', // Dark text color
    fontSize: 16,
    fontWeight: '500',
  },
});

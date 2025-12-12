import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const SearchDrawerStyles = StyleSheet.create({
  safeAreaContent: {
    flex: 1,
    // Using backgroundLight (White) as the main canvas
    backgroundColor: COLORS.backgroundLight,
  } as ViewStyle,

  drawerPressable: {
    flex: 1,
  } as ViewStyle,

  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.s16,
    paddingTop: SPACING.s12,
  } as ViewStyle,

  // --- Search Bar ---
  searchContainer: {
    marginBottom: SPACING.s12,
  } as ViewStyle,

  searchBar: {
    flexDirection: 'row',
    // Using backgroundNeutral (Soft Gray) for the input pill background
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: 24,
    height: 44,
    alignItems: 'center',
    paddingHorizontal: SPACING.s16,
  } as ViewStyle,

  searchBarInput: {
    flex: 1,
    // Dark text for readability on light gray background
    color: COLORS.textPrimary,
    fontSize: 16,
    padding: 0,
  } as TextStyle,

  // --- Top Menu Items ---
  topMenuContainer: {
    marginBottom: SPACING.s12,
  } as ViewStyle,

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s12,
    paddingHorizontal: SPACING.s4,
  } as ViewStyle,

  menuIcon: {
    marginRight: SPACING.s12,
    // Dark text color for high contrast icons
    color: COLORS.textPrimary,
  } as TextStyle,

  menuLabel: {
    // Dark text for menu labels
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  } as TextStyle,

  newChatLabel: {
    fontWeight: '600',
  } as TextStyle,

  newChatIconContainer: {
    marginLeft: 'auto',
  } as ViewStyle,

  // --- Section Headers ---
  sectionTitleContainer: {
    marginTop: SPACING.s8,
    marginBottom: SPACING.s8,
    paddingHorizontal: SPACING.s4,
  } as ViewStyle,

  sectionTitle: {
    // Medium gray for subtle section headers
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  } as TextStyle,

  // --- Chat History List ---
  scrollArea: {
    flex: 1,
  } as ViewStyle,

  scrollContent: {
    paddingBottom: SPACING.s24,
  } as ViewStyle,

  chatItem: {
    paddingVertical: SPACING.s12,
    paddingHorizontal: SPACING.s4,
  } as ViewStyle,

  chatItemText: {
    // Dark text for history items
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '400',
  } as TextStyle,

  // --- User Profile Footer ---
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',

    // Modern Card Styling
    backgroundColor: COLORS.backgroundNeutral, // Creates the card shape against the white background
    borderRadius: 16,                          // Rounded edges
    padding: SPACING.s12,                      // Inner spacing for the card content

    // Positioning
    marginTop: SPACING.s16,                    // Push away from the chat list
    marginBottom: SPACING.s24,                 // Space from the bottom of the screen
    marginHorizontal: SPACING.s4,              // Slight inset from the sides if needed

    // Remove the old "Divider" look
    borderTopWidth: 0,
  } as ViewStyle,

  userAvatar: {
    width: 40,        // Slightly larger for the card look (optional, current is 36)
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s12,
  } as ViewStyle,

  avatarText: {
    // White text ensures contrast on the primary color avatar
    color: COLORS.backgroundLight,
    fontSize: 14,
    fontWeight: '700',
  } as TextStyle,

  userName: {
    // Dark text for the username
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  } as TextStyle,
});
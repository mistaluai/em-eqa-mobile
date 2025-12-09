import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';
import { SPACING } from '../../spacing';

export const EventCardStyles = StyleSheet.create({
  // Main Row Layout
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 0, // Handled by the content inside
    minHeight: 100,
  } as ViewStyle,

  // --- Timeline Column (Left) ---
  timelineColumn: {
    width: 60,
    alignItems: 'center',
    paddingTop: 0,
    marginRight: SPACING.s12,
  } as ViewStyle,

  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
  } as TextStyle,

  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary, // UltraViolet Node
    borderWidth: 2,
    borderColor: COLORS.backgroundLight, // White border to separate from line
    zIndex: 2,
    marginTop: 4, // Align visually with the card title top
  } as ViewStyle,

  timelineLine: {
    position: 'absolute',
    top: 24, // Start slightly below the time text
    bottom: -10, // Extend to next item
    width: 2,
    backgroundColor: COLORS.borderLight, // Subtle connection line
    zIndex: 1,
  } as ViewStyle,

  // --- Content Card (Right) ---
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: SPACING.s24,
    overflow: 'hidden', // Ensures hero image respects corners
    // Optional: Add subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,

  // Hero Image
  heroMediaContainer: {
    width: '100%',
    height: 120, // Cinematic aspect ratio
    backgroundColor: COLORS.textSecondary, // Placeholder dark grey
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  durationBadge: {
    position: 'absolute',
    bottom: SPACING.s8,
    right: SPACING.s8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: SPACING.s8,
    paddingVertical: 2,
    borderRadius: RADIUS.default,
  } as ViewStyle,

  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  } as TextStyle,

  // Text Content
  contentPadding: {
    padding: SPACING.s16,
  } as ViewStyle,

  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s4,
  } as TextStyle,

  eventSummary: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  } as TextStyle,
});
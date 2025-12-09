import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const DeviceConnectionScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.s24,
    paddingTop: SPACING.s24,
  },
  visualArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s24,
  },
  statusContainer: {
    marginBottom: SPACING.s32,
  },
  actionContainer: {
    marginBottom: SPACING.s32,
  },
  // Ripple Styles
  rippleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  rippleCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    zIndex: 1,
  },
  centerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  searchingText: {
    marginTop: 140, // Push below the circle
    color: COLORS.textSecondary,
    fontWeight: '600',
    letterSpacing: 1,
  }
});
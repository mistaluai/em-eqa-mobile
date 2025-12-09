import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { RADIUS } from '../../radius';

export const LivePreviewBoxStyles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 4 / 3, // Standard camera aspect ratio
    backgroundColor: '#000000', // Black background for video feel
    borderRadius: RADIUS.large + 8, // Extra rounded
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeContainer: {
    // Active styling if needed
  },
  mockVideoFeed: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2A2A2A', // Dark grey to simulate video feed
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.navPrivacy, // Red
    marginRight: 6,
  },
  liveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  offlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineText: {
    color: COLORS.textSecondary,
    marginTop: 12,
    fontWeight: '600',
  }
});
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';

export const LivePreviewBox: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <View style={[styles.container, isActive && styles.activeContainer]}>
    {isActive ? (
      <>
        {/* Mock Video Feed Background */}
        <View style={styles.mockVideoFeed}>
          <Ionicons name="videocam" size={48} color={COLORS.backgroundLight} style={{ opacity: 0.5 }} />
        </View>

        {/* Live Indicator Overlay */}
        <View style={styles.liveBadge}>
          <View style={styles.redDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </>
    ) : (
      <View style={styles.offlineContainer}>
        <Ionicons name="eye-off-outline" size={48} color={COLORS.textSecondary} />
        <Text style={styles.offlineText}>Camera Offline</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
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
  },
});
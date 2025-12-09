import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { LivePreviewBoxStyles } from '../../../theme/styles/DeviceConnectionScreen/LivePreviewBoxStyle';

export const LivePreviewBox: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <View style={[LivePreviewBoxStyles.container, isActive && LivePreviewBoxStyles.activeContainer]}>
    {isActive ? (
      <>
        {/* Mock Video Feed Background */}
        <View style={LivePreviewBoxStyles.mockVideoFeed}>
          <Ionicons name="videocam" size={48} color={COLORS.backgroundLight} style={{ opacity: 0.5 }} />
        </View>

        {/* Live Indicator Overlay */}
        <View style={LivePreviewBoxStyles.liveBadge}>
          <View style={LivePreviewBoxStyles.redDot} />
          <Text style={LivePreviewBoxStyles.liveText}>LIVE</Text>
        </View>
      </>
    ) : (
      <View style={LivePreviewBoxStyles.offlineContainer}>
        <Ionicons name="eye-off-outline" size={48} color={COLORS.textSecondary} />
        <Text style={LivePreviewBoxStyles.offlineText}>Camera Offline</Text>
      </View>
    )}
  </View>
);
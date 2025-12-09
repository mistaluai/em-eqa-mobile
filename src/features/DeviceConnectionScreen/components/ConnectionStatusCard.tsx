import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { ConnectionStatusCardStyles } from '../../../theme/styles/DeviceConnectionScreen/ConnectionStatusCardStyle';

interface ConnectionStatusCardProps {
  status: 'connected' | 'disconnected' | 'searching';
  deviceName: string;
  deviceModel: string;
  batteryLevel: number;
}

export const ConnectionStatusCard: React.FC<ConnectionStatusCardProps> = ({
  status,
  deviceName,
  deviceModel,
  batteryLevel,
}) => {
  const isConnected = status === 'connected';
  const statusColor = isConnected ? COLORS.navStatus : COLORS.textSecondary;
  const statusText = isConnected ? 'Active' : 'Offline';

  return (
    <View style={ConnectionStatusCardStyles.glassContainer}>
      {/* Row 1: Header & Status */}
      <View style={ConnectionStatusCardStyles.row}>
        <View>
          <Text style={ConnectionStatusCardStyles.label}>Device</Text>
          <Text style={ConnectionStatusCardStyles.deviceName}>{deviceName}</Text>
        </View>
        <View style={ConnectionStatusCardStyles.statusBadge}>
          <View style={[ConnectionStatusCardStyles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[ConnectionStatusCardStyles.statusText, { color: statusColor }]}>{statusText}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={ConnectionStatusCardStyles.divider} />

      {/* Row 2: Details (Model & Battery) */}
      <View style={ConnectionStatusCardStyles.detailsRow}>
        <View style={ConnectionStatusCardStyles.detailItem}>
          <Ionicons name="hardware-chip-outline" size={18} color={COLORS.textSecondary} />
          <Text style={ConnectionStatusCardStyles.detailText}>{deviceModel}</Text>
        </View>
        <View style={ConnectionStatusCardStyles.detailItem}>
          <Ionicons name={batteryLevel > 20 ? "battery-half-outline" : "battery-dead-outline"} size={18} color={COLORS.textSecondary} />
          <Text style={ConnectionStatusCardStyles.detailText}>{batteryLevel}% Battery</Text>
        </View>
      </View>
    </View>
  );
};
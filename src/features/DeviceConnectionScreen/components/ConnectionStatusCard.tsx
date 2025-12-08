import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { ConnectionStatusCardStyles } from '../../../theme/styles/DeviceConnectionScreen/ConnectionStatusCardStyle';
import { TYPOGRAPHY } from '../../../theme';

interface ConnectionStatusCardProps {
  status: 'connected' | 'disconnected';
  deviceName: string;
  lastCheckTime: string;
}

export const ConnectionStatusCard: React.FC<ConnectionStatusCardProps> = ({
  status,
  deviceName,
  lastCheckTime,
}) => {
  // Switched COLORS.ultraViolet to COLORS.primary and COLORS.desertSand to COLORS.secondary
  const statusColor = status === 'connected' ? COLORS.primary : COLORS.secondary;
  const statusText = status === 'connected' ? 'Connected' : 'Disconnected';
  const statusIcon = status === 'connected' ? 'wifi' : 'warning';

  return (
    <AppCard style={ConnectionStatusCardStyles.statusCard}>
      <View style={ConnectionStatusCardStyles.statusRow}>
        <View style={[ConnectionStatusCardStyles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[TYPOGRAPHY.BodyM, { color: statusColor }, ConnectionStatusCardStyles.statusText]}>
          {statusText}
        </Text>
        <Text style={[TYPOGRAPHY.Caption, ConnectionStatusCardStyles.deviceName]}>{deviceName}</Text>
      </View>
      <View style={ConnectionStatusCardStyles.statusRow}>
        <Ionicons name={statusIcon as any} size={24} color={statusColor} style={ConnectionStatusCardStyles.iconMargin} />
        <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary }]}>
          Last Check: {lastCheckTime}
        </Text>
      </View>
    </AppCard>
  );
};
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

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
    <AppCard style={styles.statusCard}>
      <View style={styles.statusRow}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[TYPOGRAPHY.BodyM, { color: statusColor, fontWeight: '700' }]}>
          {statusText}
        </Text>
        {/* Switched COLORS.softGray to COLORS.textSecondary for subtle text */}
        <Text style={[TYPOGRAPHY.Caption, styles.deviceName]}>{deviceName}</Text>
      </View>
      <View style={styles.statusRow}>
        <Ionicons name={statusIcon as any} size={24} color={statusColor} style={{ marginRight: SPACING.s8 }} />
        {/* Switched COLORS.softGray to COLORS.textSecondary for general body text */}
        <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary }]}>
          Last Check: {lastCheckTime}
        </Text>
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  statusCard: {
    width: '100%',
    marginBottom: SPACING.s32,
    gap: SPACING.s12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    marginRight: SPACING.s8,
  },
  deviceName: {
    // Retaining old style: COLORS.softGray is now COLORS.backgroundNeutral, but using COLORS.textSecondary for text
    color: COLORS.textSecondary,
    marginLeft: SPACING.s16,
    flex: 1,
    textAlign: 'right',
  },
});
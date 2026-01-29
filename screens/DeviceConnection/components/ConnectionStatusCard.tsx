import { RADIUS, SPACING } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.glassContainer}>
      {/* Row 1: Header & Status */}
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Device</Text>
          <Text style={styles.deviceName}>{deviceName}</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Row 2: Details (Model & Battery) */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons name="hardware-chip-outline" size={18} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{deviceModel}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name={batteryLevel > 20 ? "battery-half-outline" : "battery-dead-outline"} size={18} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{batteryLevel}% Battery</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // High opacity for glass effect
    borderRadius: RADIUS.large,
    padding: SPACING.s20,
    // Soft shadow for elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,1)', // Highlight border
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s12,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundNeutral,
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s4,
    borderRadius: RADIUS.full,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.s12,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: SPACING.s24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.s8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
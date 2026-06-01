import { LAYOUT, RADIUS, SPACING } from '@/theme';
import { useThemeColor } from "@/theme/useThemeColor";
import { useThemeStyles } from "@/theme/useThemeStyles";
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ConnectionStatusCardProps {
  status: 'disconnected' | 'scanning' | 'found' | 'connected' | 'provisioned';
  deviceName: string;
  deviceIP: string;
}

export const ConnectionStatusCard: React.FC<ConnectionStatusCardProps> = ({
  status,
  deviceName,
  deviceIP,
}) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  const isLinked = status === 'connected' || status === 'provisioned';
  // Use semantic color for success (emerald500 reference)
  const statusColor = isLinked ? COLORS.components.navigation.status : COLORS.textSecondary;

  let statusText = 'Offline';
  if (status === 'scanning') statusText = 'Searching...';
  if (status === 'found') statusText = 'Ready to Pair';
  if (status === 'connected') statusText = 'BLE Linked';
  if (status === 'provisioned') statusText = 'Wi-Fi Active';

  return (
    <View style={styles.glassContainer}>
      {/* Row 1: Header & Status */}
      <View style={[LAYOUT.flexRowBetween, styles.row]}>
        <View>
          <Text style={styles.label}>Integration Target</Text>
          <Text style={styles.deviceName} numberOfLines={1}>{deviceName}</Text>
        </View>
        <View style={[styles.statusBadge, { borderColor: statusColor }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Row 2: Details - Completed */}
      <View style={styles.detailsRow}>
        <View style={[LAYOUT.flexRowCenter, styles.detailItem]}>
          <Ionicons name="camera-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.detailText} numberOfLines={1}>IP: {deviceIP || 'Disconnected'}</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  glassContainer: {
    width: '100%',
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    padding: SPACING.s20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  row: {
    marginBottom: SPACING.s12,
  },
  label: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  deviceName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: SPACING.s8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
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
    gap: SPACING.s8,
    flex: 1,
  },
  detailText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
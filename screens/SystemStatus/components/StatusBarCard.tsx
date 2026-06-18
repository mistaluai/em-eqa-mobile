import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SHADOW, SPACING } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PulsingDot } from './PulsingDot';

interface StatusBarCardProps {
  title: string;
  iconName: string;
  statusText: string;
  detailText: string;
  statusColor: string;
  isLoading?: boolean;
}

export const StatusBarCard: React.FC<StatusBarCardProps> = ({
  title,
  iconName,
  statusText,
  detailText,
  statusColor,
  isLoading = false,
}) => {
  const styles = useThemeStyles(createStyles);

  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: `${statusColor}15` }]}>
        <Ionicons name={iconName as any} size={26} color={statusColor} />
      </View>
      
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detailText}</Text>
      </View>

      <View style={[styles.badge, { backgroundColor: `${statusColor}10`, borderColor: `${statusColor}30` }]}>
        <PulsingDot color={statusColor} size={8} isPulsing={isLoading} />
        <Text style={[styles.badgeText, { color: statusColor }]}>{statusText}</Text>
      </View>
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.s16,
    borderRadius: RADIUS.large,
    marginBottom: SPACING.s16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOW.medium,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.05,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s16,
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.s12,
    paddingVertical: SPACING.s8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    gap: SPACING.s8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SHADOW, SPACING } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { PulsingDot } from './PulsingDot';

interface StatusBarCardProps {
  title: string;
  iconName: string;
  statusText: string;
  detailText: string;
  statusColor: string;
  isLoading?: boolean;
  onPress?: () => void;
}

export const StatusBarCard: React.FC<StatusBarCardProps> = ({
  title,
  iconName,
  statusText,
  detailText,
  statusColor,
  isLoading = false,
  onPress,
}) => {
  const styles = useThemeStyles(createStyles);

  const CardContent = (
    <>
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
      {onPress && (
        <View style={styles.chevronBox}>
          <Ionicons name="chevron-forward" size={20} color={styles.detail.color} />
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={onPress}
      >
        {CardContent}
      </Pressable>
    );
  }

  return (
    <View style={styles.card}>
      {CardContent}
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
  cardPressed: {
    opacity: 0.7,
    backgroundColor: COLORS.backgroundNeutral,
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
  chevronBox: {
    marginLeft: SPACING.s8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
import { RADIUS, SPACING } from '@/theme';
import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavItemData } from '../types';

interface NavigationCardProps {
  item: NavItemData;
  onPress: () => void;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({ item, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
      onPress={onPress}
    >
      {/* 1. Colorful Icon Container */}
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        {/* Using '20' opacity hex for a soft pastel background, or use solid item.color if preferred */}
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>

      {/* 2. Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>
      </View>

      {/* 3. Modern Chevron */}
      <View style={styles.chevronContainer}>
        <Ionicons name="chevron-forward" size={20} color={COLORS.borderDark} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight, // Clean white background
    paddingVertical: SPACING.s16,
    paddingHorizontal: SPACING.s16,
    marginBottom: SPACING.s12,
    borderRadius: RADIUS.large,
    // Subtle border instead of heavy shadow for a modern look
    borderWidth: 1,
    borderColor: COLORS.backgroundNeutral,
  },
  cardPressed: {
    backgroundColor: COLORS.backgroundNeutral, // Feedback on press
    transform: [{ scale: 0.98 }], // Micro-interaction scale
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.default, // Soft rounded square (squircle)
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  chevronContainer: {
    marginLeft: SPACING.s8,
    opacity: 0.5,
  },
});
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { NavigationCardStyles } from '../../../theme/styles/NavigationHubScreen/NavigationCardStyle';
import { NavItemData } from '../types';

interface NavigationCardProps {
  item: NavItemData;
  onPress: () => void;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({ item, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        NavigationCardStyles.card,
        pressed && NavigationCardStyles.cardPressed
      ]}
      onPress={onPress}
    >
      {/* 1. Colorful Icon Container */}
      <View style={[NavigationCardStyles.iconContainer, { backgroundColor: item.color + '20' }]}>
        {/* Using '20' opacity hex for a soft pastel background, or use solid item.color if preferred */}
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>

      {/* 2. Text Content */}
      <View style={NavigationCardStyles.textContainer}>
        <Text style={NavigationCardStyles.title}>{item.title}</Text>
        <Text style={NavigationCardStyles.description} numberOfLines={1}>
          {item.description}
        </Text>
      </View>

      {/* 3. Modern Chevron */}
      <View style={NavigationCardStyles.chevronContainer}>
        <Ionicons name="chevron-forward" size={20} color={COLORS.borderDark} />
      </View>
    </Pressable>
  );
};
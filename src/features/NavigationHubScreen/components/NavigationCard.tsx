import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { NavigationCardStyles } from '../../../theme/styles/NavigationHubScreen/NavigationCardStyle';
import { NavItemData } from '../types';

interface NavigationCardProps {
  item: NavItemData;
  onPress: () => void;
}

/**
 * NavigationCard - Reusable component for rendering navigation items
 * Used for all navigation targets including logout
 */
export const NavigationCard: React.FC<NavigationCardProps> = ({ item, onPress }) => {
  return (
    <Pressable
      style={NavigationCardStyles.card}
      onPress={onPress}
      android_ripple={{ color: COLORS.borderLight }}
    >
      <View style={NavigationCardStyles.container}>
        <View style={NavigationCardStyles.textContainer}>
          <Text style={NavigationCardStyles.title}>{item.title}</Text>
          <Text style={NavigationCardStyles.description}>{item.description}</Text>
        </View>
        <Text style={NavigationCardStyles.chevron}>&gt;</Text>
      </View>
    </Pressable>
  );
};


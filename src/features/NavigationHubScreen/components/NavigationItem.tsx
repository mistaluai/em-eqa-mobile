import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { CARD, TYPOGRAPHY } from '../../../theme/styles';
import { NavItemData } from '../types';

interface NavItemProps {
  item: NavItemData;
  onPress: () => void;
}

/**
 * NavigationItem - Pure presentation component for navigation card
 */
export const NavigationItem: React.FC<NavItemProps> = ({ item, onPress }) => {
  return (
    <Pressable
      style={CARD.navigationItem}
      onPress={onPress}
      android_ripple={{ color: COLORS.borderLight }}
    >
      <View style={CARD.navigationItemContent}>
        <View style={[CARD.navigationIconWrapper, { backgroundColor: item.color }]}>
          <Text style={CARD.navigationIcon}>{item.icon}</Text>
        </View>
        <View style={CARD.navigationTextContainer}>
          <Text style={[TYPOGRAPHY.BodyL, CARD.navigationTitle]}>{item.title}</Text>
          <Text style={[TYPOGRAPHY.Caption, CARD.navigationDescription]}>{item.description}</Text>
        </View>
        <Text style={CARD.navigationChevron}>&gt;</Text>
      </View>
    </Pressable>
  );
};


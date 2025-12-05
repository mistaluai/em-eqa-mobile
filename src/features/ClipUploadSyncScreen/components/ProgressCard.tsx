import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { CARD, SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface ProgressCardProps {
  iconName: string;
  title: string;
  count: number;
  color: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ iconName, title, count, color }) => (
  <View style={[CARD.mini, { backgroundColor: `${COLORS.lightLavender}33` }]}>
    <Ionicons name={iconName as any} size={24} color={color} />
    <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginTop: SPACING.s8 }]}>{count}</Text>
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.softGray }]}>{title}</Text>
  </View>
);


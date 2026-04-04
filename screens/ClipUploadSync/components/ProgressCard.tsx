// ProgressCard.tsx
import { CARD, SPACING, TYPOGRAPHY } from '@/theme';
import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface ProgressCardProps {
  iconName: string;
  title: string;
  count: number;
  color: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ iconName, title, count, color }) => (
  // Background uses a translucent tint of the semantic primary light color
  <View style={[CARD.mini, { backgroundColor: `${COLORS.primaryLight}33` }]}>
    <Ionicons name={iconName as any} size={24} color={color} />
    {/* Count text is now primary dark text color */}
    <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary, marginTop: SPACING.s8 }]}>{count}</Text>
    {/* Title text is now secondary dark text color */}
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary }]}>{title}</Text>
  </View>
);
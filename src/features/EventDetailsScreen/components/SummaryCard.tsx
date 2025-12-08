import React from 'react';
import { Text } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { SummaryCardStyles } from '../../../theme/styles/EventDetailsScreen/SummaryCardStyle';
import { TYPOGRAPHY } from '../../../theme';

interface SummaryCardProps {
  summary: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => (
  <AppCard style={SummaryCardStyles.summaryCard}>
    <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary }, SummaryCardStyles.summaryTitle]}>Summary</Text>
    <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary }]}>{summary}</Text>
  </AppCard>
);
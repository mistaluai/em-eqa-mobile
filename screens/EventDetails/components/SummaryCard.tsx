import { TYPOGRAPHY } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AppCard from '../../../components/AppCard';

interface SummaryCardProps {
  summary: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => (
  <AppCard style={styles.summaryCard}>
    <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary }, styles.summaryTitle]}>
      Summary
    </Text>
    <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary }]}>
      {summary}
    </Text>
  </AppCard>
);

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: COLORS.backgroundNeutral,
  },
  summaryTitle: {
    marginBottom: 8,
  },
});
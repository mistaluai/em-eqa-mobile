import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface SummaryCardProps {
  summary: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => (
  <AppCard style={styles.summaryCard}>
    <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.white, marginBottom: SPACING.s8 }]}>Summary</Text>
    <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.softGray }]}>{summary}</Text>
  </AppCard>
);

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: COLORS.gray700,
  },
});


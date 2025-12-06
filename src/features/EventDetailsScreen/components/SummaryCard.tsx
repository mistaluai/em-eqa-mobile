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
    {/* UI Change: Title text color switched from COLORS.white to COLORS.textPrimary */}
    <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary, marginBottom: SPACING.s8 }]}>Summary</Text>
    {/* UI Change: Body text color switched from COLORS.softGray to COLORS.textSecondary */}
    <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary }]}>{summary}</Text>
  </AppCard>
);

const styles = StyleSheet.create({
  summaryCard: {
    // UI Change: Card background switched from COLORS.gray700 to COLORS.backgroundNeutral
    backgroundColor: COLORS.backgroundNeutral,
  },
});
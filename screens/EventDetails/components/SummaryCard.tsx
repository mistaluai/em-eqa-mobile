import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { TYPOGRAPHY } from '@/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AppCard from '../../../components/AppCard';

interface SummaryCardProps {
  summary: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  return (
    <AppCard style={styles.summaryCard}>
      <Text style={[TYPOGRAPHY.HeadlineM, { color: COLORS.textPrimary }, styles.summaryTitle]}>
        Summary
      </Text>
      <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textSecondary }]}>
        {summary}
      </Text>
    </AppCard>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  summaryCard: {
    backgroundColor: COLORS.backgroundNeutral,
  },
  summaryTitle: {
    marginBottom: 8,
  },
});
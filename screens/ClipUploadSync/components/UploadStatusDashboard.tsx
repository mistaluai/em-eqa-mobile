import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
// UploadStatusDashboard.tsx
import { CARD, SPACING } from '@/theme';
import React from 'react';
import { View } from 'react-native';
import { UploadStatus } from '../../../shared/types';
import { ProgressCard } from './ProgressCard';

interface UploadStatusDashboardProps {
  status: UploadStatus;
}

export const UploadStatusDashboard: React.FC<UploadStatusDashboardProps> = ({ status }) => {
  const COLORS = useThemeColor();

  return (
    <View style={[CARD.row, { marginBottom: SPACING.s32, gap: SPACING.s16 }]}>
      {/* Completed color uses primary */}
      <ProgressCard iconName="checkmark-circle-outline" title="Completed" count={status.completed} color={COLORS.primary} />
      {/* Pending color uses text secondary */}
      <ProgressCard iconName="time-outline" title="Pending" count={status.pending} color={COLORS.secondary} />
      {/* Failed color uses secondary (accent/error) */}
      <ProgressCard iconName="close-circle-outline" title="Failed" count={status.failed} color={COLORS.warning} />
    </View>
  );
};
import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { CARD, SPACING } from '../../../theme/styles';
import { UploadStatus } from '../../../shared/types';
import { ProgressCard } from './ProgressCard';

interface UploadStatusDashboardProps {
  status: UploadStatus;
}

export const UploadStatusDashboard: React.FC<UploadStatusDashboardProps> = ({ status }) => (
  <View style={[CARD.row, { marginBottom: SPACING.s32, gap: SPACING.s16 }]}>
    <ProgressCard iconName="checkmark-circle-outline" title="Completed" count={status.completed} color={COLORS.ultraViolet} />
    <ProgressCard iconName="time-outline" title="Pending" count={status.pending} color={COLORS.softGray} />
    <ProgressCard iconName="close-circle-outline" title="Failed" count={status.failed} color={COLORS.desertSand} />
  </View>
);


import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { StatusBarCardStyles } from '../../../theme/styles/SystemStatusScreen/StatusBarCardStyle';
import { TYPOGRAPHY } from '../../../theme';

interface StatusBarCardProps {
  title: string;
  iconName: string;
  statusText: string;
  detailText: string;
  statusColor: string;
  progress?: number;
}

export const StatusBarCard: React.FC<StatusBarCardProps> = ({
  title,
  iconName,
  statusText,
  detailText,
  statusColor,
  progress,
}) => (
  <View>
    <Text style={[TYPOGRAPHY.HeadlineM, StatusBarCardStyles.sectionTitle]}>{title}</Text>
    <AppCard style={StatusBarCardStyles.statusCard}>
      <View style={StatusBarCardStyles.cardContent}>
        <Ionicons name={iconName as any} size={32} color={statusColor} style={StatusBarCardStyles.iconMargin} />
        <View style={StatusBarCardStyles.textBlock}>
          <Text style={[TYPOGRAPHY.BodyL, { color: statusColor, fontWeight: '700' }]}>{statusText}</Text>
          <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary }]}>{detailText}</Text>
        </View>
        {progress !== undefined && (
          <Text style={[TYPOGRAPHY.BodyL, { color: statusColor, fontWeight: '700' }, StatusBarCardStyles.progressText]}>
            {progress}%
          </Text>
        )}
      </View>
      {progress !== undefined && (
        <View style={StatusBarCardStyles.progressBarTrack}>
          <View style={[StatusBarCardStyles.progressBarFill, { width: `${progress}%`, backgroundColor: statusColor }]} />
        </View>
      )}
    </AppCard>
  </View>
);
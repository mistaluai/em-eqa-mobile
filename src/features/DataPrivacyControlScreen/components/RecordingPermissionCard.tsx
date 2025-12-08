// RecordingPermissionCard.tsx
import React from 'react';
import { Switch, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { RecordingPermissionCardStyles } from '../../../theme/styles/DataPrivacyControlScreen/RecordingPermissionCardStyle';
import { TYPOGRAPHY } from '../../../theme';

interface RecordingPermissionCardProps {
  isRecordingEnabled: boolean;
  onToggle: (value: boolean) => void;
}

export const RecordingPermissionCard: React.FC<RecordingPermissionCardProps> = ({
  isRecordingEnabled,
  onToggle,
}) => (
  <AppCard style={RecordingPermissionCardStyles.card}>
    <View style={RecordingPermissionCardStyles.row}>
      <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textPrimary }]}>Audio Recording</Text>
      <Switch
        trackColor={{ false: COLORS.borderLight, true: COLORS.primaryLight }}
        thumbColor={isRecordingEnabled ? COLORS.primary : COLORS.textSecondary}
        onValueChange={onToggle}
        value={isRecordingEnabled}
      />
    </View>
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary }, RecordingPermissionCardStyles.caption]}>
      {isRecordingEnabled ? 'Audio is currently being recorded.' : 'Audio recording is disabled.'}
    </Text>
  </AppCard>
);
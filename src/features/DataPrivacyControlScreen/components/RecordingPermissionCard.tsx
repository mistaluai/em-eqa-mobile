import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface RecordingPermissionCardProps {
  isRecordingEnabled: boolean;
  onToggle: (value: boolean) => void;
}

export const RecordingPermissionCard: React.FC<RecordingPermissionCardProps> = ({
  isRecordingEnabled,
  onToggle,
}) => (
  <AppCard style={styles.card}>
    <View style={styles.row}>
      <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.white }]}>Audio Recording</Text>
      <Switch
        trackColor={{ false: COLORS.gray700, true: COLORS.lightLavender }}
        thumbColor={isRecordingEnabled ? COLORS.ultraViolet : COLORS.softGray}
        onValueChange={onToggle}
        value={isRecordingEnabled}
      />
    </View>
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.softGray, marginTop: SPACING.s4 }]}>
      {isRecordingEnabled ? 'Audio is currently being recorded.' : 'Audio recording is disabled.'}
    </Text>
  </AppCard>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.gray700,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});


// RecordingPermissionCard.tsx
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
      {/* Text color is now primary dark text */}
      <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textPrimary }]}>Audio Recording</Text>
      <Switch
        // Track colors updated for light theme semantics
        trackColor={{ false: COLORS.borderLight, true: COLORS.primaryLight }}
        // Thumb colors updated for light theme semantics
        thumbColor={isRecordingEnabled ? COLORS.primary : COLORS.textSecondary}
        onValueChange={onToggle}
        value={isRecordingEnabled}
      />
    </View>
    {/* Caption color is now secondary dark text */}
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary, marginTop: SPACING.s4 }]}>
      {isRecordingEnabled ? 'Audio is currently being recorded.' : 'Audio recording is disabled.'}
    </Text>
  </AppCard>
);

const styles = StyleSheet.create({
  card: {
    // Card background is now the neutral surface color
    backgroundColor: COLORS.backgroundNeutral,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
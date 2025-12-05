import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { COLORS } from '../../../theme/colors';
import { SPACING, TYPOGRAPHY } from '../../../theme/styles';
import { snapToClosestOption } from '../../../shared/utils';

interface DataRetentionSliderProps {
  retentionDays: number;
  onRetentionDaysChange: (days: number) => void;
  retentionOptions?: number[];
}

const DEFAULT_RETENTION_OPTIONS = [10, 30, 45, 90];

export const DataRetentionSlider: React.FC<DataRetentionSliderProps> = ({
  retentionDays,
  onRetentionDaysChange,
  retentionOptions = DEFAULT_RETENTION_OPTIONS,
}) => {
  const handleSlidingComplete = (value: number) => {
    onRetentionDaysChange(snapToClosestOption(value, retentionOptions));
  };

  return (
    <AppCard style={styles.card}>
      <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.white, marginBottom: SPACING.s20 }]}>
        Retain Clips for: <Text style={{ color: COLORS.ultraViolet, fontWeight: '700' }}>{retentionDays} Days</Text>
      </Text>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={10}
        maximumValue={90}
        step={1}
        value={retentionDays}
        onValueChange={onRetentionDaysChange}
        onSlidingComplete={handleSlidingComplete}
        minimumTrackTintColor={COLORS.ultraViolet}
        maximumTrackTintColor={COLORS.gray700}
        thumbTintColor={COLORS.ultraViolet}
      />

      <View style={styles.sliderLabels}>
        {retentionOptions.map((day) => (
          <Text key={day} style={[TYPOGRAPHY.Caption, { color: COLORS.softGray, fontWeight: '600' }]}>
            {day}
          </Text>
        ))}
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.gray700,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.s8,
  },
});


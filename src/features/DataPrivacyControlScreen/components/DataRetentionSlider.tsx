// DataRetentionSlider.tsx
import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { snapToClosestOption } from '../../../shared/utils';
import { COLORS } from '../../../theme/colors';
import { SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface DataRetentionSliderProps {
  retentionDays: number;
  onRetentionDaysChange: (days: number) => void;
  retentionOptions?: number[];
}

const DEFAULT_RETENTION_OPTIONS = [10,  45, 90];

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
      {/* Title text uses primary dark text */}
      <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textPrimary, marginBottom: SPACING.s20 }]}>
        Retain Clips for  
        {/* Highlight text uses primary color */}
        <Text style={{ color: COLORS.primary, fontWeight: '700' }}> : {retentionDays} Days</Text>
      </Text>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={10}
        maximumValue={90}
        step={10}
        value={retentionDays}
        onValueChange={onRetentionDaysChange}
        onSlidingComplete={handleSlidingComplete}
        // Slider colors updated for light theme semantics
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.borderLight}
        thumbTintColor={COLORS.primary}
      />

      <View style={styles.sliderLabels}>
        {retentionOptions.map((day) => (
          // Label text uses secondary dark text
          <Text key={day} style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary, fontWeight: '600' }]}>
            {day}
          </Text>
        ))}
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    // Card background is now the neutral surface color
    backgroundColor: COLORS.backgroundNeutral,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.s8,
  },
});
// DataRetentionSlider.tsx
import Slider from '@react-native-community/slider';
import React from 'react';
import { Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { snapToClosestOption } from '../../../shared/utils';
import { COLORS } from '../../../theme/colors';
import { DataRetentionSliderStyles } from '../../../theme/styles/DataPrivacyControlScreen/DataRetentionSliderStyle';
import { TYPOGRAPHY } from '../../../theme';

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
    <AppCard style={DataRetentionSliderStyles.card}>
      <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textPrimary }, DataRetentionSliderStyles.title]}>
        Retain Clips for  
        <Text style={[{ color: COLORS.primary }, DataRetentionSliderStyles.highlightText]}> : {retentionDays} Days</Text>
      </Text>

      <Slider
        style={DataRetentionSliderStyles.slider}
        minimumValue={10}
        maximumValue={90}
        step={10}
        value={retentionDays}
        onValueChange={onRetentionDaysChange}
        onSlidingComplete={handleSlidingComplete}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.borderLight}
        thumbTintColor={COLORS.primary}
      />

      <View style={DataRetentionSliderStyles.sliderLabels}>
        {retentionOptions.map((day) => (
          <Text key={day} style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary }, DataRetentionSliderStyles.labelText]}>
            {day}
          </Text>
        ))}
      </View>
    </AppCard>
  );
};
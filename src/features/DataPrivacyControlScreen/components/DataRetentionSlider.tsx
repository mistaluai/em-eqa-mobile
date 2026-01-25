// DataRetentionSlider.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';
import { TYPOGRAPHY } from '../../../theme'; // Adjusted to relative path for consistency
import { DataRetentionSliderStyles as styles } from '../../../theme/styles/DataPrivacyControlScreen/DataRetentionSliderStyle';

interface DataRetentionSliderProps {
  retentionDays: number;
  onRetentionDaysChange: (days: number) => void;
  retentionOptions?: number[];
}

const DEFAULT_RETENTION_OPTIONS = [10, 45, 90];

export const DataRetentionSlider: React.FC<DataRetentionSliderProps> = ({
  retentionDays,
  onRetentionDaysChange,
  retentionOptions = DEFAULT_RETENTION_OPTIONS,
}) => {
  return (
    <AppCard style={styles.card}>
      {/* Mapped 'HeadlineS' to 'BodyL' (18px) + Bold 
        to fit hierarchy below HeadlineM (24px) 
      */}
      <Text style={[
        TYPOGRAPHY.BodyL,
        { fontWeight: '600' },
        styles.headerTitle
      ]}>
        Retention Period
      </Text>

      {/* Mapped 'BodyS' to 'BodyM' (16px) */}
      <Text style={[TYPOGRAPHY.BodyM, styles.helperText]}>
        Events older than <Text style={{ fontWeight: '700' }}>{retentionDays} days</Text> are automatically deleted.
      </Text>

      <View style={styles.segmentedContainer}>
        {retentionOptions.map((option) => {
          const isSelected = retentionDays === option;
          return (
            <Pressable
              key={option}
              onPress={() => onRetentionDaysChange(option)}
              style={[
                styles.segmentButton,
                isSelected && styles.segmentButtonActive
              ]}
            >
              {/* Using Caption (14px) for the buttons, 
                 overriding color/weight via styles 
              */}
              <Text style={[
                TYPOGRAPHY.Caption,
                styles.segmentText,
                isSelected && styles.segmentTextActive
              ]}>
                {option} Days
              </Text>
            </Pressable>
          );
        })}
      </View>
    </AppCard>
  );
};
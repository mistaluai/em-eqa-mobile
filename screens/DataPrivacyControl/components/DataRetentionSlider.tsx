import { SPACING, TYPOGRAPHY } from '@/theme';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppCard from '../../../components/AppCard';

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundNeutral, // Soft Gray surface
    padding: SPACING.s16,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s4,
  },
  helperText: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.s20,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight, // White background for the track
    borderRadius: SPACING.s12,
    padding: SPACING.s4,
    gap: SPACING.s8, // Space between buttons
  },
  segmentButton: {
    flex: 1,
    paddingVertical: SPACING.s12,
    alignItems: 'center',
    borderRadius: SPACING.s8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  segmentButtonActive: {
    backgroundColor: COLORS.primary, // UltraViolet
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  segmentText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  segmentTextActive: {
    color: COLORS.backgroundLight, // White Text
    fontWeight: '700',
  },
});
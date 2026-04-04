// ProgressBar.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RADIUS, SPACING } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  // PROGRESS.track should be defined with COLORS.borderLight
  <View style={PROGRESS.track}>
    {/* PROGRESS.fill should be defined with COLORS.primary */}
    <View style={[PROGRESS.fill, { width: `${progress}%` }]} />
  </View>
);

const PROGRESS = StyleSheet.create({
  track: {
    height: SPACING.s8,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.large,
    marginTop: SPACING.s8,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.large,
  },
  trackSmall: {
    height: SPACING.s4,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.full,
    marginTop: SPACING.s12,
    overflow: 'hidden',
  },
  fillSmall: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
});
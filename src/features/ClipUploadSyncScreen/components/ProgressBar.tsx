// ProgressBar.tsx
import React from 'react';
import { View } from 'react-native';
import { PROGRESS } from '../../../theme';

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
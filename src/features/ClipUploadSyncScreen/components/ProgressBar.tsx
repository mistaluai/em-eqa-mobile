import React from 'react';
import { View } from 'react-native';
import { PROGRESS } from '../../../theme/styles';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <View style={PROGRESS.track}>
    <View style={[PROGRESS.fill, { width: `${progress}%` }]} />
  </View>
);


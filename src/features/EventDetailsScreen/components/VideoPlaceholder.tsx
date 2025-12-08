import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { VideoPlaceholderStyles } from '../../../theme/styles/EventDetailsScreen/VideoPlaceholderStyle';

interface VideoPlaceholderProps {
  onPress?: () => void;
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ onPress }) => (
  <View style={VideoPlaceholderStyles.container}>
    <Ionicons name="play-circle-outline" size={80} color={COLORS.textSecondary} />
  </View>
);
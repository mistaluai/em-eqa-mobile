import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { LivePreviewBoxStyles } from '../../../theme/styles/DeviceConnectionScreen/LivePreviewBoxStyle';
import { TYPOGRAPHY } from '../../../theme';

interface LivePreviewBoxProps {
  width?: number | string;
}

export const LivePreviewBox: React.FC<LivePreviewBoxProps> = ({ width = '90%' }) => (
  <View style={[LivePreviewBoxStyles.container, typeof width === 'number' ? { width } : { width: width as any }]}>
    <Text style={[TYPOGRAPHY.BodyL, LivePreviewBoxStyles.text]}>Live Preview Placeholder (16:9)</Text>
    <Ionicons name="videocam-outline" size={60} color={COLORS.textSecondary} style={LivePreviewBoxStyles.iconMargin} />
  </View>
);
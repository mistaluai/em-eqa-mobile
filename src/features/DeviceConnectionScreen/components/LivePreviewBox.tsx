import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface LivePreviewBoxProps {
  width?: number;
}

export const LivePreviewBox: React.FC<LivePreviewBoxProps> = ({ width = '90%' }) => (
  <View style={[styles.container, typeof width === 'number' ? { width } : { width }]}>
    <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.gray700 }]}>Live Preview Placeholder (16:9)</Text>
    <Ionicons name="videocam-outline" size={60} color={COLORS.gray700} style={{ marginTop: SPACING.s12 }} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.gray700,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s32,
    ...SHADOW.default,
  },
});


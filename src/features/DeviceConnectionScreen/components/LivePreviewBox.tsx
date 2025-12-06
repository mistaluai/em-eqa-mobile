import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface LivePreviewBoxProps {
  width?: number | string;
}

export const LivePreviewBox: React.FC<LivePreviewBoxProps> = ({ width = '90%' }) => (
  // Switched the background color from a dark color to COLORS.backgroundNeutral (F2F2F7)
  <View style={[styles.container, typeof width === 'number' ? { width } : { width: width as any }]}>
    {/* Switched the text/icon color from a gray color to COLORS.textSecondary (3A3A3A) */}
    <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.textSecondary }]}>Live Preview Placeholder (16:9)</Text>
    <Ionicons name="videocam-outline" size={60} color={COLORS.textSecondary} style={{ marginTop: SPACING.s12 }} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    aspectRatio: (16 / 9)/1.5,
    // Used the new neutral background color
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s32,
    //...SHADOW.default,
  },
});
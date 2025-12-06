import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SHADOW, SPACING } from '../../../theme/styles';

interface VideoPlaceholderProps {
  onPress?: () => void;
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ onPress }) => (
  <View style={styles.container}>
    {/* UI Change: Icon color switched from COLORS.softGray to COLORS.textSecondary */}
    <Ionicons name="play-circle-outline" size={80} color={COLORS.textSecondary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    // UI Change: Background color switched from COLORS.gray700 to COLORS.backgroundNeutral
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s24,
    ...SHADOW.default,
  },
});
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { SHADOW } from '../../../theme/shadow';
import { SPACING } from '../../../theme/spacing';

interface VideoPlaceholderProps {
  onPress?: () => void;
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ onPress }) => (
  <View style={styles.container}>
    <Ionicons name="play-circle-outline" size={80} color={COLORS.textSecondary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: (16 / 9) / 1.25,
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s24,
    ...SHADOW.default,
  },
});
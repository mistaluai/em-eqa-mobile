import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SHADOW, SPACING } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';


interface VideoPlaceholderProps {
  onPress?: () => void;
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ onPress }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();

  return (
    <View style={styles.container}>
      <Ionicons name="play-circle-outline" size={80} color={COLORS.textSecondary} />
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
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
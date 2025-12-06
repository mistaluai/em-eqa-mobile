import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface PhotoUploadPlaceholderProps {
  onPress?: () => void;
  size?: number;
}

export const PhotoUploadPlaceholder: React.FC<PhotoUploadPlaceholderProps> = ({
  onPress,
  size = 128,
}) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.photoPlaceholder,
      {
        width: size,
        height: size,
        // UI CHANGE: Use a visible text/secondary color for the border/icon/text
        borderColor: COLORS.textSecondary,
        // UI CHANGE: Use a light neutral background color for the placeholder
        backgroundColor: COLORS.backgroundNeutral,
      },
    ]}
  >
    {/* UI CHANGE: Use a visible text/secondary color for the icon */}
    <Ionicons name="add-circle-outline" size={32} color={COLORS.textSecondary} />
    {/* UI CHANGE: Use a visible text/secondary color for the 'Add Photo' text */}
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.textSecondary, marginTop: SPACING.s4 }]}>
      Add Photo
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  photoPlaceholder: {
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.default,
  },
});
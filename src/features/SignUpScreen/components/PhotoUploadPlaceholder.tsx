import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
        borderColor: COLORS.desertSand,
        backgroundColor: `${COLORS.ultraViolet}33`,
      },
    ]}
  >
    <Ionicons name="add-circle-outline" size={32} color={COLORS.desertSand} />
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.desertSand, marginTop: SPACING.s4 }]}>
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


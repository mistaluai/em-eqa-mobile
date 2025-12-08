import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { PhotoUploadPlaceholderStyles } from '../../../theme/styles/SignUpScreen/PhotoUploadPlaceholderStyle';
import { TYPOGRAPHY } from '../../../theme';

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
      PhotoUploadPlaceholderStyles.photoPlaceholder,
      {
        width: size,
        height: size,
      },
    ]}
  >
    <Ionicons name="add-circle-outline" size={32} style={PhotoUploadPlaceholderStyles.icon} />
    <Text style={[TYPOGRAPHY.Caption, PhotoUploadPlaceholderStyles.text]}>
      Add Photo
    </Text>
  </Pressable>
);
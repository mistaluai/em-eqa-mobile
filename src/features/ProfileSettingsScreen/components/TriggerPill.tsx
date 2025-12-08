import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TriggerPillStyles } from '../../../theme/styles/ProfileSettingsScreen/TriggerPillStyle';
import { TYPOGRAPHY } from '../../../theme';

interface TriggerPillProps {
  trigger: string;
  onRemove: (trigger: string) => void;
}

export const TriggerPill: React.FC<TriggerPillProps> = ({ trigger, onRemove }) => (
  <Pressable onPress={() => onRemove(trigger)} style={TriggerPillStyles.triggerPill}>
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.primary, fontWeight: '700' }, TriggerPillStyles.triggerText]}>
      {trigger}
    </Text>
    <Ionicons name="close-circle" size={16} color={COLORS.primary} />
  </Pressable>
);
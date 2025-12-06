import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface TriggerPillProps {
  trigger: string;
  onRemove: (trigger: string) => void;
}

export const TriggerPill: React.FC<TriggerPillProps> = ({ trigger, onRemove }) => (
  <Pressable onPress={() => onRemove(trigger)} style={styles.triggerPill}>
    <Text style={[TYPOGRAPHY.Caption, { color: COLORS.primary, fontWeight: '700', marginRight: SPACING.s4 }]}>
      {trigger}
    </Text>
    <Ionicons name="close-circle" size={16} color={COLORS.primary} />
  </Pressable>
);

const styles = StyleSheet.create({
  triggerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}20`,
    paddingVertical: SPACING.s8,
    paddingLeft: SPACING.s12,
    paddingRight: SPACING.s8,
    borderRadius: RADIUS.large,
  },
});
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../theme/styles';

interface AppCheckboxProps {
  label: string;
  checked: boolean;
  onPress: (checked: boolean) => void;
  disabled?: boolean;
}

const AppCheckbox: React.FC<AppCheckboxProps> = ({
  label,
  checked,
  onPress,
  disabled = false,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onPress(!checked);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, disabled && styles.disabled, pressed && styles.pressed]}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {/* Checkmark color is white (backgroundLight) */}
        {checked && <Ionicons name="checkmark" size={18} color={COLORS.backgroundLight} />}
      </View>
      {/* Label color is dark (textPrimary) */}
      <Text style={[TYPOGRAPHY.BodyM, styles.label]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.default / 2,
    borderWidth: 2,
    // Border uses medium dark gray (textSecondary)
    borderColor: COLORS.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s12,
  },
  checkedBox: {
    // Checked background uses the primary color
    backgroundColor: COLORS.primary,
    // Checked border uses the primary color
    borderColor: COLORS.primary,
  },
  label: {
    // Label uses the primary text color
    color: COLORS.textPrimary,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.9,
  },
});

export default AppCheckbox;
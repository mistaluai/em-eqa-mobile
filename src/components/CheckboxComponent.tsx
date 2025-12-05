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
        {checked && <Ionicons name="checkmark" size={18} color={COLORS.white} />}
      </View>
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
    borderColor: COLORS.gray700,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s12,
  },
  checkedBox: {
    backgroundColor: COLORS.ultraViolet,
    borderColor: COLORS.ultraViolet,
  },
  label: {
    color: COLORS.white,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.9,
  },
});

export default AppCheckbox;
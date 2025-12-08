import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme';
import { CheckboxComponentStyles } from '../theme/styles/components/CheckboxComponentStyle';

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
      style={({ pressed }) => [CheckboxComponentStyles.container, disabled && CheckboxComponentStyles.disabled, pressed && CheckboxComponentStyles.pressed]}
    >
      <View style={[CheckboxComponentStyles.checkbox, checked && CheckboxComponentStyles.checkedBox]}>
        {/* Checkmark color is white (backgroundLight) */}
        {checked && <Ionicons name="checkmark" size={18} color={COLORS.backgroundLight} />}
      </View>
      {/* Label color is dark (textPrimary) */}
      <Text style={[TYPOGRAPHY.BodyM, CheckboxComponentStyles.label]}>{label}</Text>
    </Pressable>
  );
};

export default AppCheckbox;
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardTypeOptions,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme';
import { InputComponentStyles } from '../theme/styles/components/InputComponentStyle';

interface AppInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string;

  /** Added for keyboard-aware scrolling */
  onFocus?: () => void;
  onBlur?: () => void;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  onFocus,
  onBlur,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={InputComponentStyles.container}>
      <Text style={[TYPOGRAPHY.BodyM, InputComponentStyles.label]}>{label}</Text>

      <View
        style={[
          InputComponentStyles.inputWrapper,
          !!error && InputComponentStyles.errorBorder,
          isFocused && InputComponentStyles.focusBorder,
        ]}
      >
        <TextInput
          style={InputComponentStyles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
        />

        {secureTextEntry && (
          <Pressable onPress={() => setIsSecure(!isSecure)} style={InputComponentStyles.toggleButton}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={COLORS.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {error && <Text style={[TYPOGRAPHY.Caption, InputComponentStyles.errorText]}>{error}</Text>}
    </View>
  );
};

export default AppInput;

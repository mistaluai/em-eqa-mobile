import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { KeyboardTypeOptions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../theme/styles';

interface AppInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  keyboardType = 'default',
  error,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {/* Label Text: Primary text color */}
      <Text style={[TYPOGRAPHY.BodyM, styles.label]}>{label}</Text>
      
      {/* Input Wrapper: Uses neutral background for surface */}
      <View style={[styles.inputWrapper, !!error && styles.errorBorder]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          // Placeholder Text: Secondary text color
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        />
        {secureTextEntry && (
          <Pressable onPress={() => setIsSecure(!isSecure)} style={styles.toggleButton}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              // Toggle Icon: Secondary text color
              color={COLORS.textSecondary}
            />
          </Pressable>
        )}
      </View>
      {/* Error Text: Secondary/Accent color */}
      {error && <Text style={[TYPOGRAPHY.Caption, styles.errorText]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    // Label Text color is now dark (textPrimary)
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // Input Background uses soft gray (backgroundNeutral)
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    paddingHorizontal: SPACING.s16,
    height: 56,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.BodyM,
    // Input Text color is now dark (textPrimary)
    color: COLORS.textPrimary,
    height: '100%',
    paddingVertical: 0,
  },
  toggleButton: {
    paddingLeft: SPACING.s12,
  },
  errorBorder: {
    borderWidth: 1,
    // Error Border uses the accent color (secondary)
    borderColor: COLORS.secondary,
  },
  errorText: {
    // Error Text uses the accent color (secondary)
    color: COLORS.secondary,
    marginTop: SPACING.s4,
  },
});

export default AppInput;
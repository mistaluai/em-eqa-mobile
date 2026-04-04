import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View
} from 'react-native';

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
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[TYPOGRAPHY.BodyM, styles.label]}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          !!error && styles.errorBorder,
          isFocused && styles.focusBorder,
        ]}
      >
        <TextInput
          style={styles.input}
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
          <Pressable onPress={() => setIsSecure(!isSecure)} style={styles.toggleButton}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={COLORS.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {error && <Text style={[TYPOGRAPHY.Caption, styles.errorText]}>{error}</Text>}
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: RADIUS.default,
    paddingHorizontal: SPACING.s16,
    height: 56,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.BodyM,
    color: COLORS.textPrimary,
    height: '100%',
    paddingVertical: 0,
  } as TextStyle,
  toggleButton: {
    paddingLeft: SPACING.s12,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  focusBorder: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  errorText: {
    color: COLORS.secondary,
    marginTop: SPACING.s4,
  },
});

export default AppInput;
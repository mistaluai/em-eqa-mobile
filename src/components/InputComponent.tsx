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
      <Text style={[TYPOGRAPHY.BodyM, styles.label]}>{label}</Text>
      <View style={[styles.inputWrapper, !!error && styles.errorBorder]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray700}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        />
        {secureTextEntry && (
          <Pressable onPress={() => setIsSecure(!isSecure)} style={styles.toggleButton}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={COLORS.gray700}
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={[TYPOGRAPHY.Caption, styles.errorText]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: COLORS.white,
    marginBottom: SPACING.s8,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray200,
    borderRadius: RADIUS.default,
    paddingHorizontal: SPACING.s16,
    height: 56,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.BodyM,
    color: COLORS.carbonBlack,
    height: '100%',
    paddingVertical: 0,
  },
  toggleButton: {
    paddingLeft: SPACING.s12,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: COLORS.desertSand,
  },
  errorText: {
    color: COLORS.desertSand,
    marginTop: SPACING.s4,
  },
});

export default AppInput;
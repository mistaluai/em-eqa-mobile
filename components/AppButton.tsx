import { RADIUS, SPACING, TYPOGRAPHY } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return [
          styles.secondaryButton,
          { borderColor: COLORS.primary, borderWidth: 1.5, backgroundColor: 'transparent' },
        ];
      case 'danger':
        return [
          styles.secondaryButton,
          { borderColor: COLORS.secondary, borderWidth: 1.5, backgroundColor: 'transparent' },
        ];
      case 'primary':
      default:
        return [styles.primaryButton, { backgroundColor: COLORS.primary }];
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'secondary':
      case 'danger':
        return [styles.secondaryText, { color: variant === 'danger' ? COLORS.textSecondary : COLORS.textPrimary }];
      case 'primary':
      default:
        return [styles.primaryText];
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.baseButton,
        ...getButtonStyles(),
        style,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
      disabled={disabled}
    >
      <Text style={[TYPOGRAPHY.BodyM, ...getTextStyles()]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: SPACING.s16,
    paddingHorizontal: SPACING.s24,
    borderRadius: RADIUS.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    // Shadow or other primary specific styles can go here
  },
  secondaryButton: {
    // Secondary specific base styles
  },
  primaryText: {
    color: COLORS.backgroundLight,
    fontWeight: '600',
  },
  secondaryText: {
    fontWeight: '600',
    color: COLORS.backgroundLight, // Default, usually overridden in component logic
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;
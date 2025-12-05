import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS } from '../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../theme/styles';

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
          { borderColor: COLORS.ultraViolet, borderWidth: 1.5, backgroundColor: 'transparent' },
        ];
      case 'danger':
        return [
          styles.secondaryButton,
          { borderColor: COLORS.desertSand, borderWidth: 1.5, backgroundColor: 'transparent' },
        ];
      case 'primary':
      default:
        return [styles.primaryButton, { backgroundColor: COLORS.ultraViolet,  }];
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'secondary':
      case 'danger':
        return [styles.secondaryText, { color: variant === 'danger' ? COLORS.desertSand : COLORS.ultraViolet }];
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
    // shadow applied inline in getButtonStyles
  },
  secondaryButton: {
    // border applied inline in getButtonStyles
  },
  primaryText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  secondaryText: {
    fontWeight: '600',
    // color applied inline in getTextStyles
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;
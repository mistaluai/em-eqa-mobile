import React from 'react';
import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme';
import { AppButtonStyles } from '../theme/styles/components/AppButtonStyle';

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
          AppButtonStyles.secondaryButton,
          { borderColor: COLORS.primary, borderWidth: 1.5, backgroundColor: 'transparent' },
        ];
      case 'danger':
        return [
          AppButtonStyles.secondaryButton,
          { borderColor: COLORS.secondary, borderWidth: 1.5, backgroundColor: 'transparent' },
        ];
      case 'primary':
      default:
        return [AppButtonStyles.primaryButton, { backgroundColor: COLORS.primary,  }];
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'secondary':
      case 'danger':
        return [AppButtonStyles.secondaryText, { color: variant === 'danger' ? COLORS.textSecondary : COLORS.textPrimary }];
      case 'primary':
      default:
        return [AppButtonStyles.primaryText];
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        AppButtonStyles.baseButton,
        ...getButtonStyles(),
        style,
        disabled && AppButtonStyles.disabled,
        pressed && AppButtonStyles.pressed,
      ]}
      disabled={disabled}
    >
      <Text style={[TYPOGRAPHY.BodyM, ...getTextStyles()]}>{title}</Text>
    </Pressable>
  );
};

export default AppButton;
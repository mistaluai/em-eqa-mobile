import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AppInput from '../../../components/InputComponent';
import { SPACING, TYPOGRAPHY, TEXT } from '../../../theme/styles';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

/**
 * LoginForm - Pure presentation component for login form
 * Receives state and handlers as props
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onForgotPassword,
  onSignUp,
}) => {
  return (
    <View style={{ width: '100%' }}>
      <AppInput
        label="Email Address"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
      />
      <View style={{ height: SPACING.s16 }} />
      <AppInput
        label="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry={true}
      />
      <View style={{ height: SPACING.s12 }} />
      {onForgotPassword && (
        <Pressable onPress={onForgotPassword}>
          <Text style={[TYPOGRAPHY.Caption, TEXT.forgotPassword]}>Forgot Password?</Text>
        </Pressable>
      )}

      {onSignUp && (
        <Pressable onPress={onSignUp} style={{ marginTop: SPACING.s32, alignSelf: 'center' }}>
          <Text style={[TYPOGRAPHY.BodyM, TEXT.signup]}>
            Don't have an account?{' '}
            <Text style={TEXT.signupLink}>Sign up</Text>
          </Text>
        </Pressable>
      )}
    </View>
  );
};
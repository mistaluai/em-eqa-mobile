import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AppInput from '../../../components/InputComponent';
import { TEXT, TYPOGRAPHY } from '../../../theme';
import { LoginFormStyles } from '../../../theme/styles/LoginScreen/LoginFormStyle';

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
    <View style={LoginFormStyles.container}>
      <AppInput
        label="Email Address"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
      />
      <View style={LoginFormStyles.spacer} />
      <AppInput
        label="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry={true}
      />
      <View style={LoginFormStyles.spacerSmall} />
      {onForgotPassword && (
        <Pressable onPress={onForgotPassword}>
          <Text style={[TYPOGRAPHY.Caption, TEXT.forgotPassword]}>Forgot Password?</Text>
        </Pressable>
      )}

      {onSignUp && (
        <Pressable onPress={onSignUp} style={LoginFormStyles.signUpContainer}>
          <Text style={[TYPOGRAPHY.BodyM, TEXT.signup]}>
            Don't have an account?{' '}
            <Text style={TEXT.signupLink}>Sign up</Text>
          </Text>
        </Pressable>
      )}
    </View>
  );
};
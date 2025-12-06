import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppInput from '../../../components/InputComponent';
import { COLORS } from '../../../theme/colors';
import { SPACING, TYPOGRAPHY } from '../../../theme/styles';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onForgotPassword, onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(email, password);
  };

  // Expose submit handler via ref or return values
  React.useImperativeHandle(undefined, () => ({
    submit: handleLogin,
    getValues: () => ({ email, password }),
  }), [email, password]);

  return (
    <View style={styles.formContainer}>
      <AppInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={{ height: SPACING.s16 }} />
      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <View style={{ height: SPACING.s12 }} />
      {onForgotPassword && (
        <Pressable onPress={onForgotPassword}>
          <Text style={[TYPOGRAPHY.Caption, styles.forgotPassword]}>Forgot Password?</Text>
        </Pressable>
      )}

      <View style={{ height: SPACING.s32 }} />
      
      {/* Assuming AppButton is used here in the main screen, but keeping it generic for component re-use */}
      {/* <AppButton title="Login" onPress={handleLogin} /> */}

      {onSignUp && (
        <Pressable onPress={onSignUp} style={{ marginTop: SPACING.s32, alignSelf: 'center' }}>
          <Text style={[TYPOGRAPHY.BodyM, styles.signUpLink]}>
            Don't have an account?{' '}
            <Text style={{ color: COLORS.primary, fontWeight: '700' }}>Sign up</Text>
          </Text>
        </Pressable>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  forgotPassword: {
    // UI CHANGE: Text color from softGray/white to textSecondary
    color: COLORS.textSecondary,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  signUpLink: {
    marginTop: SPACING.s32,
    alignSelf: 'center',
    // UI CHANGE: Text color from white/softGray to textPrimary
    color: COLORS.textPrimary,
  },
});
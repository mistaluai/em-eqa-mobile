import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
import { SCREEN, SPACING, TEXT, TYPOGRAPHY } from '../../theme';
import { LoginFormStyles } from '../../theme/styles/LoginScreen/LoginFormStyle';
import { LoginScreenStyles } from '../../theme/styles/LoginScreen/LoginScreenStyle';
// Ensure this path matches where you saved the hook file
import { useLoginLogic } from './hooks/useLoginLogic';

const LoginScreen: React.FC = () => {
  const { width } = useWindowDimensions();

  // 1. INTEGRATION: Destructure all necessary values and functions
  const {
    email,
    password,
    loading,              // Use this for button state
    setEmail,
    setPassword,
    handleLogin,
    handleNavigateToSignUp,
    handleForgotPassword  // Added this (was missing in your snippet)
  } = useLoginLogic();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Detect keyboard open/close events
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true)
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <KeyboardAvoidingView
        style={LoginScreenStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : -10}
      >
        <View
          style={[
            SCREEN.scrollContainer,
            LoginScreenStyles.scrollContainer,
            {
              justifyContent: isKeyboardOpen ? 'flex-start' : 'center',
              paddingHorizontal: SPACING.s20,
              paddingVertical: SPACING.s24,
            },
          ]}
        >
          <View
            style={[
              LoginScreenStyles.logoContainer,
              {
                maxHeight: isKeyboardOpen ? 0 : 200,
                opacity: isKeyboardOpen ? 0 : 1,
                transform: [{ scale: isKeyboardOpen ? 0.9 : 1 }],
              },
            ]}
          >
            <Image
              source={require('../../../assets/images/em_logo.png')}
              style={LoginScreenStyles.logoImage}
            />
          </View>

          <Text
            style={[
              TYPOGRAPHY.HeadlineXL,
              TEXT.title,
              LoginScreenStyles.title,
              {
                marginBottom: isKeyboardOpen ? SPACING.s96 : SPACING.s24,
                // Note: React Native uses 'opacity' or 'display', not 'visibility'
                opacity: isKeyboardOpen ? 0 : 1,
                height: isKeyboardOpen ? 0 : undefined,
              },
            ]}
          >
            Welcome
          </Text>

          <View style={LoginScreenStyles.formContainer}>
            {/* 2. INTEGRATION: State is now controlled by Zustand via the Hook */}
            <AppInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="example@email.com"
            />

            <View style={LoginFormStyles.spacer} />

            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <View style={LoginFormStyles.spacerSmall} />

            <Pressable onPress={handleForgotPassword}>
              <Text style={[TYPOGRAPHY.Caption, TEXT.forgotPassword]}>
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          <View style={[LoginScreenStyles.buttonSpacer, { height: isKeyboardOpen ? SPACING.s16 : SPACING.s24 }]} />

          {/* 3. INTEGRATION: Pass loading state to button */}
          <AppButton
            title="Login"
            onPress={handleLogin}
            style={LoginScreenStyles.loginButton}
            disabled={loading} // Prevent double clicks
          />

          <View style={isKeyboardOpen ? LoginScreenStyles.signUpContainerKeyboard : LoginScreenStyles.signUpContainer}>
            <Pressable onPress={handleNavigateToSignUp}>
              <Text style={[TYPOGRAPHY.BodyM, TEXT.signup]}>
                Don't have an account?{' '}
                <Text style={TEXT.signupLink}>Sign up</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SPACING, TEXT, TYPOGRAPHY } from '@/theme';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
import { useLoginLogic } from './hooks/useLoginLogic';

const LoginScreen: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
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
    handleForgotPassword
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : -10}
      >
        <View
          style={[
            styles.scrollContainer,
            {
              justifyContent: isKeyboardOpen ? 'flex-start' : 'center',
              paddingHorizontal: SPACING.s20,
              paddingVertical: SPACING.s24,
            },
          ]}
        >
          <View
            style={[
              styles.logoContainer,
              {
                maxHeight: isKeyboardOpen ? 0 : 200,
                opacity: isKeyboardOpen ? 0 : 1,
                transform: [{ scale: isKeyboardOpen ? 0.9 : 1 }],
              },
            ]}
          >
            <Image
              source={require('../../assets/images/em_logo.png')}
              style={styles.logoImage}
            />
          </View>

          <Text
            style={[
              TYPOGRAPHY.HeadlineXL,
              TEXT.title,
              styles.title,
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

          <View style={styles.formContainer}>
            {/* 2. INTEGRATION: State is now controlled by Zustand via the Hook */}
            <AppInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="example@email.com"
            />

            <View style={styles.spacer} />

            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <View style={styles.spacerSmall} />

            <Pressable onPress={handleForgotPassword}>
              <Text style={[TYPOGRAPHY.Caption, TEXT.forgotPassword]}>
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          <View style={[styles.buttonSpacer, { height: isKeyboardOpen ? SPACING.s16 : SPACING.s24 }]} />

          {/* 3. INTEGRATION: Pass loading state to button */}
          <AppButton
            title="Login"
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={loading} // Prevent double clicks
          />

          <View style={isKeyboardOpen ? styles.signUpContainerKeyboard : styles.signUpContainer}>
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

const createStyles = (COLORS: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: SPACING.s16,
    // Note: Padding and justifyContent are handled via inline styles for dynamic behavior
  },
  logoContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    // Additional title styles handled by TYPOGRAPHY.HeadlineXL
  },
  formContainer: {
    width: '100%',
  },
  spacer: {
    height: SPACING.s16,
  },
  spacerSmall: {
    height: SPACING.s12,
  },
  buttonSpacer: {
    height: SPACING.s32,
  },
  loginButton: {
    width: '90%',
    // Merged from SCREEN defaults to ensure consistency
    backgroundColor: COLORS.primary,
  },
  signUpContainer: {
    marginTop: SPACING.s32,
    alignSelf: 'center',
  },
  signUpContainerKeyboard: {
    marginTop: SPACING.s16,
    alignSelf: 'center',
  },
});

export default LoginScreen;
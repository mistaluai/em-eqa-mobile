import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
import { SCREEN, SPACING, TEXT, TYPOGRAPHY } from '../../theme/styles';
import { LogoPlaceholder } from './components/LogoPlaceholder';
import { useLoginLogic } from './hooks/useLoginLogic';

const LoginScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleForgotPassword,
    handleNavigateToSignUp,
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
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : -10}
      >
        <View
          style={[
            SCREEN.scrollContainer,
            {
              flex: 1,
              justifyContent: isKeyboardOpen ? 'flex-start' : 'center',
              paddingHorizontal: SPACING.s20,
              paddingVertical: SPACING.s24,
              // paddingTop: isKeyboardOpen ? SPACING.s24 : SPACING.s4,
              // paddingBottom: isKeyboardOpen ? SPACING.s24 : SPACING.s4,
            },
          ]}
        >
          {/* Animated Logo Collapse */}
          <View
            style={{
              alignItems: 'center',
              overflow: 'hidden',
              maxHeight: isKeyboardOpen ? 0 : 200,
              opacity: isKeyboardOpen ? 0 : 1,
              transform: [
                { scale: isKeyboardOpen ? 0.9 : 1 },
              ],
             // marginBottom: isKeyboardOpen ? 0 : SPACING.s8,
              transitionDuration: '300ms',
            }}
          >
            <LogoPlaceholder size={width * 0.5}  />
          </View>

          {/* Title */}
          <Text
            style={[
              TYPOGRAPHY.HeadlineXL,
              TEXT.title,
              {
                fontSize: isKeyboardOpen ? 32 : 32,
                marginBottom: isKeyboardOpen ? SPACING.s96 : SPACING.s24,
                visibility: isKeyboardOpen ? 'hidden' : 'visible',
                //display: isKeyboardOpen ? 'none' : 'flex',
              },
            ]}
          >
            Welcome
          </Text>

          {/* Form Container */}
          <View style={{ width: '100%' }}>
            <AppInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="example@email.com"
            />

            <View style={{ height: SPACING.s16 }} />

            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <View style={{ height: SPACING.s12 }} />

            <Pressable onPress={handleForgotPassword}>
              <Text style={[TYPOGRAPHY.Caption, TEXT.forgotPassword]}>
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          {/* Login Button */}
          <View style={{ height: isKeyboardOpen ? SPACING.s16 : SPACING.s24  }} />

          <AppButton title="Login" onPress={handleLogin}  style={{ width : "90%"}} />

          {/* Signup */}
          <View
            style={{
              marginTop: isKeyboardOpen ? SPACING.s16 : SPACING.s32,
            }}
          >
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

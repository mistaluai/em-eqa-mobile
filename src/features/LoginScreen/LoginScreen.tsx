import React from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
import { SCREEN, SPACING, TEXT, TYPOGRAPHY } from '../../theme/styles';
import { LogoPlaceholder } from './components/LogoPlaceholder';
import { useLoginLogic } from './hooks/useLoginLogic';

/**
 * LoginScreen - Main screen component for user authentication
 * Handles composition and rendering using hooks and components
 */
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

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <ScrollView contentContainerStyle={SCREEN.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={SCREEN.loginTopSpacer} />

        <LogoPlaceholder size={width * 0.5} />

        <View style={SCREEN.loginLogoSpacer} />

        <Text style={[TYPOGRAPHY.HeadlineXL, TEXT.title]}>Welcome</Text>

        <View style={SCREEN.loginTitleSpacer} />

        <View style={SCREEN.loginFormContainer}>
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
          <Pressable onPress={handleForgotPassword}>
            <Text style={[TYPOGRAPHY.Caption, TEXT.forgotPassword]}>Forgot Password?</Text>
          </Pressable>
        </View>

        <View style={SCREEN.loginButtonSpacer} />

        <AppButton title="Login" onPress={handleLogin} style={SCREEN.loginButton} />

        <View style={{ height: SPACING.s32 }} />

        <Pressable onPress={handleNavigateToSignUp}>
          <Text style={[TYPOGRAPHY.BodyM, TEXT.signup]}>
            Don't have an account?{' '}
            <Text style={TEXT.signupLink}>Sign up</Text>
          </Text>
        </Pressable>

        <View style={SCREEN.loginBottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
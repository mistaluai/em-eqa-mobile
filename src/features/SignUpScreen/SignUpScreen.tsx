import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
import { SignUpFormStyles } from '../../theme/styles/SignUpScreen/SignUpFormStyle';
import { SignUpScreenStyles } from '../../theme/styles/SignUpScreen/SignUpScreenStyle';
import { SCREEN, SPACING, TEXT, TYPOGRAPHY } from '../../theme';
import { PhotoUploadPlaceholder } from './components/PhotoUploadPlaceholder';
import { useSignUpLogic } from './hooks/useSignUpLogic';

const SignUpScreen: React.FC = () => {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    setFullName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignUp,
    handleNavigateToLogin,
  } = useSignUpLogic();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // simple input focus logic (same as Login)
  const handleFocus = () => setIsKeyboardOpen(true);

  const handleBlur = () => {
    setTimeout(() => {
      const active = TextInput.State.currentlyFocusedInput?.();
      if (!active) setIsKeyboardOpen(false);
    }, 80);
  };

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <KeyboardAvoidingView
        style={SignUpScreenStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : -10}
      >
        <View
          style={[
            SCREEN.scrollContainer,
            SignUpScreenStyles.scrollContainer,
            {
              justifyContent: isKeyboardOpen ? 'flex-start' : 'center',
              paddingHorizontal: SPACING.s20,
              marginBottom: isKeyboardOpen ? 6 : 0,
            },
          ]}
        >
          <View
            style={[
              SignUpScreenStyles.photoContainer,
              {
                maxHeight: isKeyboardOpen ? 0 : 200,
                opacity: isKeyboardOpen ? 0 : 1,
              } as any,
            ]}
          >
            <PhotoUploadPlaceholder
              onPress={() => console.log('Open image picker')}
            />
          </View>

          <View style={SignUpScreenStyles.spacer} />

          <Text style={[TYPOGRAPHY.HeadlineXL, TEXT.title]}>
            Create Account
          </Text>

          <View style={SignUpScreenStyles.titleSpacer} />

          <View style={SCREEN.signUpFormContainer}>
            <AppInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              keyboardType="default"
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Enter your name"
            />

            <View style={SignUpFormStyles.spacer} />

            <AppInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Enter your email"
            />

            <View style={SignUpFormStyles.spacer} />

            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Enter your password"
            />

            <View style={SignUpFormStyles.spacer} />

            <AppInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Confirm your password"
            />
          </View>

          <View style={SignUpScreenStyles.titleSpacer} />

          <AppButton
            title="Create Account"
            onPress={handleSignUp}
            style={SCREEN.signUpButton}
          />

          <View style={SignUpScreenStyles.loginLinkSpacer} />

          <Pressable onPress={handleNavigateToLogin}>
            <Text style={[TYPOGRAPHY.BodyM, TEXT.login]}>
              Have an account?{' '}
              <Text style={TEXT.signupLink}>Login</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

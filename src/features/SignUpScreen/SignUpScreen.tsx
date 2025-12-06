import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
import { SCREEN, SPACING, TEXT, TYPOGRAPHY } from '../../theme/styles';
import { PhotoUploadPlaceholder } from './components/PhotoUploadPlaceholder';
import { useSignUpLogic } from './hooks/useSignUpLogic';

/**
 * SignUpScreen - Main screen component for user registration
 * Handles composition and rendering using hooks and components
 */
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

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <ScrollView contentContainerStyle={SCREEN.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={SCREEN.signUpTopSpacer} />

        <PhotoUploadPlaceholder onPress={() => console.log('Open image picker')} />

        <View style={SCREEN.signUpPhotoSpacer} />

        <Text style={[TYPOGRAPHY.HeadlineXL, TEXT.title]}>Create Account</Text>

        <View style={SCREEN.signUpTitleSpacer} />

        <View style={SCREEN.signUpFormContainer}>
          <AppInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            keyboardType="default"
            placeholder="Enter your name"
          />
          <View style={{ height: SPACING.s16 }} />
          <AppInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
          />
          <View style={{ height: SPACING.s16 }} />
          <AppInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <View style={{ height: SPACING.s16 }} />
          <AppInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            placeholder="Confirm your password"
          />
        </View>

        <View style={{ height: SPACING.s32 }} />

        <AppButton title="Create Account" onPress={handleSignUp} style={SCREEN.signUpButton} />

        <View style={{ height: SPACING.s32 }} />

        <Pressable onPress={handleNavigateToLogin}>
          <Text style={[TYPOGRAPHY.BodyM, TEXT.login]}>
            Have an account?{' '}
            <Text style={TEXT.signupLink}>Login</Text>
          </Text>
        </Pressable>

        <View style={SCREEN.signUpBottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
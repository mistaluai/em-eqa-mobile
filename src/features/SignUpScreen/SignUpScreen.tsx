import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView, // 1. Import ScrollView
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
import { SCREEN, SPACING, TEXT, TYPOGRAPHY } from '../../theme';
import { SignUpFormStyles } from '../../theme/styles/SignUpScreen/SignUpFormStyle';
import { SignUpScreenStyles } from '../../theme/styles/SignUpScreen/SignUpScreenStyle';
import { useSignUpLogic } from './hooks/useSignUpLogic';

const SignUpScreen: React.FC = () => {
  const {
    fullName,
    setFullName,
    username,
    setUsername,
    email,
    setEmail,
    dob,
    setDOB,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignUp,
    handleNavigateToLogin,
    loading,
  } = useSignUpLogic();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');

    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }

    if (selectedDate) {
      setDOB(selectedDate);
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

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
        {/* 2. Changed View to ScrollView */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          // 3. Moved styles to contentContainerStyle
          contentContainerStyle={[
            SCREEN.scrollContainer,
            SignUpScreenStyles.scrollContainer,
            {
              // When keyboard opens, align top so we can scroll to bottom fields
              justifyContent: isKeyboardOpen ? 'flex-start' : 'center',
              paddingHorizontal: SPACING.s20,
              paddingBottom: SPACING.s40, // Add bottom padding for better scrolling experience
            },
          ]}
        >


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
              placeholder="John Doe"
            />

            <View style={SignUpFormStyles.spacer} />

            <AppInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              keyboardType="default"
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="johndoe123"
            />

            <View style={SignUpFormStyles.spacer} />

            <AppInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="john@example.com"
            />

            <View style={SignUpFormStyles.spacer} />

            {/* DATE OF BIRTH PICKER */}
            <Pressable onPress={toggleDatePicker}>
              <View pointerEvents="none">
                <AppInput
                  label="Date of Birth"
                  value={dob.toISOString().split('T')[0]}
                  onChangeText={() => { }}
                  placeholder="YYYY-MM-DD"
                />
              </View>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}

            <View style={SignUpFormStyles.spacer} />

            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="••••••"
            />

            <View style={SignUpFormStyles.spacer} />

            <AppInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="••••••"
            />
          </View>

          <View style={SignUpScreenStyles.titleSpacer} />

          <AppButton
            title={loading ? "Creating..." : "Create Account"}
            onPress={handleSignUp}
            style={SCREEN.signUpButton}
            disabled={loading}
          />

          <View style={SignUpScreenStyles.loginLinkSpacer} />

          <Pressable onPress={handleNavigateToLogin}>
            <Text style={[TYPOGRAPHY.BodyM, TEXT.login]}>
              Have an account?{' '}
              <Text style={TEXT.signupLink}>Login</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
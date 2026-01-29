import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SPACING, TEXT, TYPOGRAPHY } from '@/src/theme';
import { COLORS } from '@/src/theme/colors';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : -10}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContent,
            {
              // When keyboard opens, align top so we can scroll to bottom fields
              justifyContent: isKeyboardOpen ? 'flex-start' : 'center',
              paddingHorizontal: SPACING.s20,
              paddingBottom: SPACING.s40, // Add bottom padding for better scrolling experience
            },
          ]}
        >
          <View style={styles.spacer} />

          <Text style={[TYPOGRAPHY.HeadlineXL, TEXT.title]}>
            Create Account
          </Text>

          <View style={styles.titleSpacer} />

          <View style={styles.formContainer}>
            <AppInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              keyboardType="default"
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="John Doe"
            />

            <View style={styles.formSpacer} />

            <AppInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              keyboardType="default"
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="johndoe123"
            />

            <View style={styles.formSpacer} />

            <AppInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="john@example.com"
            />

            <View style={styles.formSpacer} />

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

            <View style={styles.formSpacer} />

            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="••••••"
            />

            <View style={styles.formSpacer} />

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

          <View style={styles.titleSpacer} />

          <AppButton
            title={loading ? "Creating..." : "Create Account"}
            onPress={handleSignUp}
            style={styles.signUpButton}
            disabled={loading}
          />

          <View style={styles.loginLinkSpacer} />

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.s32,
    alignItems: 'center',
    marginTop: SPACING.s16,
    // Note: paddingBottom and justifyContent handled dynamically in JSX
  },
  spacer: {
    height: SPACING.s32,
  },
  titleSpacer: {
    height: SPACING.s32,
  },
  formContainer: {
    width: '100%',
  },
  formSpacer: {
    height: SPACING.s16,
  },
  signUpButton: {
    width: '90%',
    backgroundColor: COLORS.primary,
  },
  loginLinkSpacer: {
    height: SPACING.s24,
  },
});

export default SignUpScreen;
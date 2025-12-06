import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
import { COLORS } from '../../theme/colors';
import { FORM, SCREEN, SPACING, TEXT, TYPOGRAPHY } from '../../theme/styles';
import { PhotoUploadPlaceholder } from './components/PhotoUploadPlaceholder';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    console.log('Signing up with:', fullName, email);
    // navigation.navigate('Home' as never); // Commented out to prevent errors if 'Home' isn't defined
  };

  return (
    // Assuming SCREEN.safeArea uses COLORS.backgroundLight
    <SafeAreaView style={SCREEN.safeArea}> 
      <ScrollView contentContainerStyle={SCREEN.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 0.5, minHeight: 20 }} />

        <PhotoUploadPlaceholder onPress={() => console.log('Open image picker')} />

        <View style={{ height: SPACING.s32 + 16 }} />

        {/* Assuming TEXT.title uses COLORS.textPrimary */}
        <Text style={[TYPOGRAPHY.HeadlineXL, TEXT.title]}>Create Account</Text>

        <View style={{ height: SPACING.s32 + 16 }} />

        <View style={FORM.container}>
          <AppInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            keyboardType="default"
            placeholder='Enter your name'
          />
          <View style={{ height: SPACING.s16 }} />
          <AppInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder='Enter your email'

          />
          <View style={{ height: SPACING.s16 }} />
          <AppInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
             placeholder='Enter your password'

          />
          <View style={{ height: SPACING.s16 }} />
          <AppInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
             placeholder='Confirm your password'

          />
        </View>

        <View style={{ height: SPACING.s32 }} />

        <AppButton title="Create Account" onPress={() => navigation.navigate('Login' as never)}
        style={{ width: '90%' ,  backgroundColor: COLORS.primary , }} 
        />

        <View style={{ height: SPACING.s32 }} />

        <Pressable onPress={() => navigation.navigate('Login' as never)}>
          {/* Assuming TEXT.login uses COLORS.textPrimary, and the bold color remains as COLORS.secondary */}
          <Text style={[TYPOGRAPHY.BodyM, TEXT.login]}>
            Have an account?{' '}
            {/* The accent color is now named 'secondary' but the value is the same. */}
            <Text style={{ color: COLORS.primary, fontWeight: '700' }}>Login</Text>
          </Text>
        </Pressable>

        <View style={{ flex: 1, minHeight: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
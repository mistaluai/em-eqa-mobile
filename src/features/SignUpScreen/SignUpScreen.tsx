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
    navigation.navigate('Home' as never);
  };

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <ScrollView contentContainerStyle={SCREEN.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 0.5, minHeight: 20 }} />

        <PhotoUploadPlaceholder onPress={() => console.log('Open image picker')} />

        <View style={{ height: SPACING.s32 + 16 }} />

        <Text style={[TYPOGRAPHY.HeadlineXL, TEXT.title]}>Create Account</Text>

        <View style={{ height: SPACING.s32 + 16 }} />

        <View style={FORM.container}>
          <AppInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            keyboardType="default"
          />
          <View style={{ height: SPACING.s16 }} />
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
          <View style={{ height: SPACING.s16 }} />
          <AppInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={{ height: SPACING.s32 }} />

        <AppButton title="Create Account" onPress={handleSignUp} />

        <View style={{ height: SPACING.s32 }} />

        <Pressable onPress={() => navigation.navigate('Login' as never)}>
          <Text style={[TYPOGRAPHY.BodyM, TEXT.login]}>
            Have an account?{' '}
            <Text style={{ color: COLORS.desertSand, fontWeight: '700' }}>Login</Text>
          </Text>
        </Pressable>

        <View style={{ flex: 1, minHeight: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;


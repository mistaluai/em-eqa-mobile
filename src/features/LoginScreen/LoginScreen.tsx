import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/InputComponent';
import { COLORS } from '../../theme/colors';
import { FORM, SCREEN, SPACING, TEXT, TYPOGRAPHY } from '../../theme/styles';
import { LogoPlaceholder } from './components/LogoPlaceholder';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
    navigation.navigate('Home' as never);
  };

  return (
    <SafeAreaView style={SCREEN.safeArea}>
      <ScrollView contentContainerStyle={SCREEN.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, minHeight: 60 }} />

        <LogoPlaceholder size={width * 0.32} />

        <View style={{ height: SPACING.s32 + 8 }} />

        <Text style={[TYPOGRAPHY.HeadlineXL, TEXT.title]}>Login</Text>

        <View style={{ height: SPACING.s32 + 16 }} />

        <View style={FORM.container}>
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
          <Pressable onPress={() => console.log('Forgot Password')}>
            <Text style={[TYPOGRAPHY.Caption, FORM.forgotPassword]}>Forgot Password?</Text>
          </Pressable>
        </View>

        <View style={{ height: SPACING.s32 }} />

        <AppButton title="Login" onPress={handleLogin} />

        <View style={{ height: SPACING.s32 }} />

        <Pressable onPress={() => navigation.navigate('Signup' as never)}>
          <Text style={[TYPOGRAPHY.BodyM, TEXT.signup]}>
            Don't have an account?{' '}
            <Text style={{ color: COLORS.desertSand, fontWeight: '700' }}>Sign Up</Text>
          </Text>
        </Pressable>

        <View style={{ flex: 1, minHeight: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;


import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppInput from '../components/InputComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../theme/styles';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
    navigation.navigate('Home' as never);
  };

  const LogoPlaceholder = () => (
    <View
      style={[
        styles.logoPlaceholder,
        { width: width * 0.32, height: width * 0.32 },
      ]}
    >
      <Text style={[TYPOGRAPHY.BodyL, { color: COLORS.white, fontWeight: '800' }]}>Logo</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Top flex spacer (min 60dp) */}
        <View style={{ flex: 1, minHeight: 60 }} />

        <LogoPlaceholder />

        <View style={{ height: SPACING.s32 + 8 }} />

        <Text style={[TYPOGRAPHY.HeadlineXL, styles.title]}>Login</Text>

        <View style={{ height: SPACING.s32 + 16 }} />

        <View style={styles.formContainer}>
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
            <Text style={[TYPOGRAPHY.Caption, styles.forgotPassword]}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        <View style={{ height: SPACING.s32 }} />

        <AppButton title="Login" onPress={handleLogin} />

        <View style={{ height: SPACING.s32 }} />

        <Pressable onPress={() => navigation.navigate('Signup' as never)}>
          <Text style={[TYPOGRAPHY.BodyM, styles.signupText]}>
            Don't have an account?{' '}
            <Text style={{ color: COLORS.desertSand, fontWeight: '700' }}>Sign Up</Text>
          </Text>
        </Pressable>

        {/* Bottom flex spacer (min 40dp) */}
        <View style={{ flex: 1, minHeight: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.carbonBlack,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.s32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholder: {
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.gray700,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.default,
  },
  title: {
    color: COLORS.white,
    alignSelf: 'flex-start',
    fontWeight: '800',
  },
  formContainer: {
    width: '100%',
  },
  forgotPassword: {
    color: COLORS.desertSand,
    textAlign: 'right',
    fontWeight: '600',
  },
  signupText: {
    color: COLORS.softGray,
    textAlign: 'center',
  },
});

export default LoginScreen;
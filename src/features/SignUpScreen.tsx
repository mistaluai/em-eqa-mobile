import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppInput from '../components/InputComponent';
import { COLORS } from '../theme/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '../theme/styles';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    console.log('Signing up with:', fullName, email);
    navigation.navigate('Home' as never);
  };

  const PhotoUploadPlaceholder = () => (
    <Pressable
      onPress={() => console.log('Open image picker')}
      style={[
        styles.photoPlaceholder,
        { width: 128, height: 128, borderColor: COLORS.desertSand, backgroundColor: `${COLORS.ultraViolet}33` },
      ]}
    >
      <Ionicons name="add-circle-outline" size={32} color={COLORS.desertSand} />
      <Text style={[TYPOGRAPHY.Caption, { color: COLORS.desertSand, marginTop: SPACING.s4 }]}>Add Photo</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Top flex spacer */}
        <View style={{ flex: 0.5, minHeight: 20 }} />

        <PhotoUploadPlaceholder />

        <View style={{ height: SPACING.s32 + 16 }} />

        <Text style={[TYPOGRAPHY.HeadlineXL, styles.title]}>Create Account</Text>

        <View style={{ height: SPACING.s32 + 16 }} />

        <View style={styles.formContainer}>
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
          <Text style={[TYPOGRAPHY.BodyM, styles.loginText]}>
            Have an account?{' '}
            <Text style={{ color: COLORS.desertSand, fontWeight: '700' }}>Login</Text>
          </Text>
        </Pressable>

        {/* Bottom flex spacer */}
        <View style={{ flex: 1, minHeight: 20 }} />
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
  photoPlaceholder: {
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderStyle: 'dashed',
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
  loginText: {
    color: COLORS.softGray,
    textAlign: 'center',
  },
});

export default SignUpScreen;
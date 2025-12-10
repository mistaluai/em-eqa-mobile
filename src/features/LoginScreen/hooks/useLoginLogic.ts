import { useAuthStore } from '../../../services/auth/supabaseAuth';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';

/**
 * Custom hook for LoginScreen logic
 * Handles form state and login submission
 */
export const useLoginLogic = () => {
  const navigation = useNavigation();

  // 1. Destructure everything you need from the Global Store
  const {
    email,
    password,
    loading,          // Useful to disable the button while logging in
    setEmail,
    setPassword,
    signInWithEmail   // The async action we wrote earlier
  } = useAuthStore();

  // 2. The Login Handler
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    console.log('Attempting login with:', email);

    // Call the store action
    await signInWithEmail();
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password');
    // TODO: Add resetPassword logic to your store later
  };

  const handleNavigateToSignUp = () => {
    navigation.navigate('Signup' as never);
  };

  return {
    email,
    password,
    loading, // Expose loading so your UI can show a spinner
    setEmail,
    setPassword,
    handleLogin,
    handleForgotPassword,
    handleNavigateToSignUp,
  };
};
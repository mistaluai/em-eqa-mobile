import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../services/auth/supabaseAuth'

/**
 * Custom hook for SignUpScreen logic
 * Handles form state via Global Store and signup submission
 */
export const useSignUpLogic = () => {
  const navigation = useNavigation();

  // 1. Local State: We keep confirmPassword local because it's 
  // just for validation and doesn't need to be stored globally.
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2. Global Store: Destructure values and setters
  const {
    email,
    password,
    full_name,
    username,
    dob,
    loading,
    setEmail,
    setPassword,
    setFullname,
    setUsername,
    setDOB,
    signUp
  } = useAuthStore();

  // 3. The Sign Up Handler
  const handleSignUp = async () => {
    // Basic Validation
    if (!email || !password || !full_name) {
      Alert.alert('Missing Data', 'Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Call the store action
    // The store handles the Supabase call and alerts for errors/success
    await signUp();
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return {
    // MAPPING: The UI expects camelCase 'fullName', 
    // but the store uses snake_case 'full_name'. We map them here.
    fullName: full_name,
    setFullName: setFullname,

    email,
    setEmail,
    password,
    setPassword,

    // Local state
    confirmPassword,
    setConfirmPassword,

    // New fields (Ready for you to add <AppInput> for them in the UI)
    username,
    setUsername,
    dob,
    setDOB,

    // UI Utilities
    loading,
    handleSignUp,
    handleNavigateToLogin,
  };
};
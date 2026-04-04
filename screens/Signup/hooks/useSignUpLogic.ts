import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../services/auth/supabaseAuth';

/**
 * Custom hook for SignUpScreen logic
 * Handles form state via Global Store and signup submission
 */
export const useSignUpLogic = () => {
  const navigation = useNavigation();

  // 1. Local Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDOB] = useState<Date>(new Date());

  // 2. Global Store: Destructure action and loading
  const {
    loading,
    signUp
  } = useAuthStore();

  // 3. The Sign Up Handler
  const handleSignUp = async () => {
    // Basic Validation
    if (!email || !password || !fullName) {
      Alert.alert('Missing Data', 'Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Call the store action
    // The store handles the Supabase call and alerts for errors/success
    await signUp(email, password, fullName, username, dob);
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return {
    fullName,
    setFullName,

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
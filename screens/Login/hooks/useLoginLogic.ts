import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../services/auth/supabaseAuth';

/**
 * Custom hook for LoginScreen logic
 * Handles form state and login submission
 */
export const useLoginLogic = () => {
  const navigation = useNavigation();

  // 1. Local Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Destructure action and loading from the Global Store
  const {
    loading,
    signInWithEmail
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
    await signInWithEmail(email, password);
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
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

/**
 * Custom hook for SignUpScreen logic
 * Handles form state and signup submission
 */
export const useSignUpLogic = () => {
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
    navigation.navigate('Login' as never);
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return {
    fullName,
    email,
    password,
    confirmPassword,
    setFullName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignUp,
    handleNavigateToLogin,
  };
};


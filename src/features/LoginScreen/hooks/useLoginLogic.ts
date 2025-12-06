import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

/**
 * Custom hook for LoginScreen logic
 * Handles form state and login submission
 */
export const useLoginLogic = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
    navigation.navigate('Home' as never);
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };

  const handleNavigateToSignUp = () => {
    navigation.navigate('Signup' as never);
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleForgotPassword,
    handleNavigateToSignUp,
  };
};


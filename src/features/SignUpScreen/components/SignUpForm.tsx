import React, { useState } from 'react';
import { View } from 'react-native';
import AppInput from '../../../components/InputComponent';
import { SignUpFormStyles } from '../../../theme/styles/SignUpScreen/SignUpFormStyle';

interface SignUpFormProps {
  onSignUp: (data: { fullName: string; email: string; password: string; confirmPassword: string }) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    onSignUp({ fullName, email, password, confirmPassword });
  };

  return (
    <View style={SignUpFormStyles.formContainer}>
      <AppInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        keyboardType="default"
      />
      <View style={SignUpFormStyles.spacer} />
      <AppInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={SignUpFormStyles.spacer} />
      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <View style={SignUpFormStyles.spacer} />
      <AppInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
    </View>
  );
};
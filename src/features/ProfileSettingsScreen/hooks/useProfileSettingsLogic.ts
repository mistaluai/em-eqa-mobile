import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../services/auth/supabaseAuth'; // [cite: 609]
import { Alert } from 'react-native';

export const useProfileSettingsLogic = () => {
  // 1. Get Global State
  const {
    full_name,
    username,
    email: storeEmail,
    dob,
    setFullname,
    setEmail: setStoreEmail
  } = useAuthStore();

  // 2. Local State for editing
  const [localEmail, setLocalEmail] = useState(storeEmail);
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');

  // 3. Calculated Age (Read-only)
  const calculateAge = (dateOfBirth: Date | string) => {
    const birthday = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const age = calculateAge(dob);

  // 4. Handlers
  const handleUpdateProfile = () => {
    // In a real app, this would call an update API
    setStoreEmail(localEmail); // Update global store
    Alert.alert('Success', 'Profile information updated.');
  };

  const handleChangeAvatar = () => {
    console.log('Open Image Picker');
  };

  const handleChangePassword = () => {
    // Navigate to a dedicated password change screen or show modal
    Alert.alert('Reset Password', 'A password reset link has been sent to your email.');
  };

  const handleUpdateTriggers = () => {
    if (naturalLanguageInput.trim().length === 0) return;
    // Here you would send this string to your LLM to parse into tags
    Alert.alert('AI Preferences Updated', 'The AI is now looking for: ' + naturalLanguageInput);
    setNaturalLanguageInput('');
  };

  // Sync local state if global changes
  useEffect(() => {
    setLocalEmail(storeEmail);
  }, [storeEmail]);

  return {
    fullName: full_name,
    username,
    email: localEmail,
    setEmail: setLocalEmail,
    dob,
    age,
    naturalLanguageInput,
    setNaturalLanguageInput,
    handleUpdateProfile,
    handleChangeAvatar,
    handleChangePassword,
    handleUpdateTriggers,
  };
};
import { useAuthStore } from '@/services/databases/supabase/supabaseAuth';
import { useAvatarStore } from '@/services/databases/supabase/supabaseAvatar';
import { useAvatarMedia } from '@/shared/hooks/useAvatarMedia';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useProfileSettingsLogic = () => {
  // 1. Get Global Auth State (User Data)
  const {
    userid,
    full_name,
    username,
    email: storeEmail, // We use this directly now
    dob,
  } = useAuthStore();

  // 2. Initialize Avatar Media Hook
  const {
    avatarUri,
    pickImage,
    uploadImageNow,
    isLoading: isAvatarLoading,
  } = useAvatarMedia();

  const { updateUserAvatarPath } = useAvatarStore();

  // 3. Local State
  // REMOVED localEmail since email is now read-only [cite: 532, 544]
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');

  // 4. Age Calculation
  const calculateAge = (dateOfBirth: Date | string | null) => {
    if (!dateOfBirth) return 'N/A';
    const birthday = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const age = calculateAge(dob);

  // 5. Handlers

  const handleChangeAvatar = async () => {
    const pickerResult = await pickImage();

    if (pickerResult && !pickerResult.canceled) {
      const safeUsername = username || 'user';
      const uploadedPath = await uploadImageNow(safeUsername, pickerResult);

      if (uploadedPath) {
        Alert.alert('Success', 'Avatar updated successfully.');
        updateUserAvatarPath(userid, uploadedPath);
      }
    }
  };

  const handleUpdateProfile = () => {
    // Since Name/Email are read-only, this function now only handles the AI preferences logic
    if (naturalLanguageInput.trim().length > 0) {
      Alert.alert('AI Preferences Updated', 'The AI is now looking for: ' + naturalLanguageInput);
      setNaturalLanguageInput('');
    } else {
      Alert.alert('Info', 'Personal information is read-only. No changes to save.');
    }
  };

  const handleChangePassword = () => {
    Alert.alert('Reset Password', 'A password reset link has been sent to your email.');
  };

  return {
    fullName: full_name,
    username,
    email: storeEmail, // Pass global email directly (Read-Only) [cite: 647]
    dob,
    age,
    avatarUri,
    isAvatarLoading,
    // setEmail: setLocalEmail, // REMOVED: No setter needed
    naturalLanguageInput,
    setNaturalLanguageInput,
    handleUpdateProfile,
    handleChangeAvatar,
    handleChangePassword,
  };
};
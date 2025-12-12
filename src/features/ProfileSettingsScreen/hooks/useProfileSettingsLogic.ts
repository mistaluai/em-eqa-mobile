import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../services/auth/supabaseAuth';
import { useAvatarStore } from '../../../services/userdata/supabaseAvatar';
import { useAvatarMedia } from '../../../shared/hooks/useAvatarMedia';

export const useProfileSettingsLogic = () => {
  // 1. Get Global Auth State (User Data)
  const {
    userid,
    full_name,
    username,
    email: storeEmail,
    dob,
    setFullname,
    setEmail: setStoreEmail
  } = useAuthStore();

  // 2. Initialize Avatar Media Hook
  const {
    avatarUri,
    pickImage,
    uploadImageNow,
    setAvatarUri,
    isLoading: isAvatarLoading,
  } = useAvatarMedia();

  const {
    updateUserAvatarPath
  } = useAvatarStore();

  const [localEmail, setLocalEmail] = useState(storeEmail);
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');

  // 3. Sync local state & Load Avatar
  useEffect(() => {
    setLocalEmail(storeEmail);
    // TODO: If you have avatar_url in your auth store, call loadAvatar here
    // if (user.avatar_url) loadAvatar(user.avatar_url);
  }, [storeEmail]);

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

  // A. Avatar Change Handler (Corrected Flow)
  const handleChangeAvatar = async () => {
    // 1. Pick Image and wait for result
    const pickerResult = await pickImage();

    // 2. If valid result, pass it DIRECTLY to upload function
    if (pickerResult && !pickerResult.canceled) {
      // Use username or 'user' as fallback
      const safeUsername = username || 'user';

      const uploadedPath = await uploadImageNow(safeUsername, pickerResult);

      if (uploadedPath) {
        Alert.alert('Success', 'Avatar updated successfully.');
        updateUserAvatarPath(userid, uploadedPath)
      }
    }
  };

  // ... (Rest of your handlers: handleUpdateProfile, handleChangePassword, etc. remain the same)
  const handleUpdateProfile = () => {
    setStoreEmail(localEmail);
    Alert.alert('Success', 'Profile information updated.');
  };

  const handleChangePassword = () => {
    Alert.alert('Reset Password', 'A password reset link has been sent to your email.');
  };

  const handleUpdateTriggers = () => {
    if (naturalLanguageInput.trim().length === 0) return;
    Alert.alert('AI Preferences Updated', 'The AI is now looking for: ' + naturalLanguageInput);
    setNaturalLanguageInput('');
  };

  return {
    fullName: full_name,
    username,
    email: localEmail,
    dob,
    age,
    avatarUri,
    isAvatarLoading,
    setEmail: setLocalEmail,
    naturalLanguageInput,
    setNaturalLanguageInput,
    handleUpdateProfile,
    handleChangeAvatar,
    handleChangePassword,
    handleUpdateTriggers,
  };
};
import { useAuthStore } from '@/services/databases/supabase/supabaseAuth';
import { useAvatarStore } from '@/services/databases/supabase/supabaseAvatar';
import { useAvatarMedia } from '@/shared/hooks/useAvatarMedia';
import { useState } from 'react';
import { Alert } from 'react-native';
import { CategoryPreferencesService } from '@/services/databases/mmkv/categoryPreferences';
import { BASE_PROMPTS } from '@/shared/utils/SemanticPrompts';

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
  const categories = Object.keys(BASE_PROMPTS);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    CategoryPreferencesService.getActiveCategories()
  );

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

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleUpdateProfile = () => {
    CategoryPreferencesService.saveActiveCategories(selectedCategories);
    Alert.alert('Success', 'AI tracking preferences updated.');
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
    categories,
    selectedCategories,
    handleToggleCategory,
    handleUpdateProfile,
    handleChangeAvatar,
    handleChangePassword,
  };
};
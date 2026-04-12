import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
// Adjust path to your actual store file
import { useAvatarStore } from '@/services/databases/supabase/supabaseAvatar';
import { useEffect } from 'react';
import { useAuthStore } from '../../services/databases/supabase/supabaseAuth';

export const useAvatarMedia = () => {
    const { avatarUri, setAvatarUri, uploadAvatar, downloadAvatar, uploading, updateUserAvatarPath } = useAvatarStore();
    const { avatar_path, userid } = useAuthStore();

    useEffect(() => {
        if (avatar_path && !avatarUri) {
            downloadAvatar(avatar_path);
        }
    }, [avatar_path, avatarUri]);

    /**
     * Opens the system Image Picker.
     * Sets the preview URI immediately so the UI updates.
     * RETURNS the picker result so the caller can use it immediately.
     */
    const pickImage = async (): Promise<ImagePicker.ImagePickerResult | null> => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setAvatarUri(result.assets[0].uri);
                return result; // Return the result directly
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image');
        }
        return null;
    };

    /**
     * Uploads the image to Supabase.
     * NOW ACCEPTS the pickerResult directly to avoid async state issues.
     */
    const uploadImageNow = async (username: string, resultToUpload: ImagePicker.ImagePickerResult) => {
        if (!resultToUpload || resultToUpload.canceled) return null;

        try {
            // Pass the picker result to your store
            const path = await uploadAvatar(username, resultToUpload);
            await updateUserAvatarPath(userid, path)
            return path;
        } catch (error) {
            Alert.alert('Error', 'Failed to upload avatar');
            throw error;
        }
    };

    /**
     * Downloads an avatar from Supabase and sets the UI state.
     * Call this when your screen loads.
     */
    const loadAvatar = async (path: string | null) => {
        if (!path) return;
        try {
            const base64Uri = await downloadAvatar(path);
            setAvatarUri(base64Uri);
        } catch (error) {
            console.log('Failed to load avatar:', error);
        }
    };

    return {
        avatarUri: avatarUri,        // Pass this to <Avatar uri={avatarUri} />
        isLoading: uploading,
        pickImage,        // Call when user clicks the avatar
        uploadImageNow,   // Call when user clicks "Save" or "Sign Up"
        setAvatarUri      // Expose setter if needed
    };
};
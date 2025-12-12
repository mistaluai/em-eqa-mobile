import * as ImagePicker from 'expo-image-picker';
import { create } from 'zustand';
import { useAuthStore } from '../auth/supabaseAuth';
import { supabase } from '../databases/supabase/supabase_client';

interface AvatarState {
    uploading: boolean;
    setUploading: (value: boolean) => void;
    avatarUri: string;
    setAvatarUri: (url: string) => void;
    uploadAvatar: (username: string, picker_result: ImagePicker.ImagePickerResult) => Promise<string>;
    downloadAvatar: (path: string) => Promise<string>;
    updateUserAvatarPath: (userId: string, path: string) => Promise<void>;
}

export const useAvatarStore = create<AvatarState>((set, get) => ({
    uploading: false,
    avatarUri: '',

    // Setters
    setAvatarUri: (url) => set({ avatarUri: url }),
    setUploading: (val) => set({ uploading: val }),

    /**
     * Uploads an image to the 'avatars' bucket.
     */
    uploadAvatar: async (username: string, picker_result: ImagePicker.ImagePickerResult): Promise<string> => {
        try {
            set({ uploading: true }); // Update state automatically

            // 1. Validation
            if (picker_result.canceled || !picker_result.assets || picker_result.assets.length === 0) {
                console.log('User cancelled image picker.');
                set({ uploading: false });
                return '';
            }

            const image = picker_result.assets[0];
            if (!image.uri) throw new Error('No image uri!');

            // 2. Prepare File Data
            // Extract extension from URI or default to jpg
            const fileExt = image.uri.split('.').pop()?.toLowerCase() || 'jpg';

            const safeUsername = username ? username.replace(/[^a-z0-9]/gi, '_') : 'user';
            const fileName = `${safeUsername}_${Date.now()}.${fileExt}`;

            // 3. Convert URI to ArrayBuffer
            const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());

            // 4. Upload to Supabase
            const { data, error } = await supabase.storage
                .from('avatars')
                .upload(fileName, arraybuffer, {
                    contentType: image.mimeType || `image/${fileExt}`,
                    upsert: true
                });

            if (error) throw error;

            set({ uploading: false });
            return data.path;

        } catch (error) {
            console.error('AvatarService: Upload failed', error);
            set({ uploading: false });
            throw error;
        }
    },

    /**
     * Downloads an image from Supabase and converts it to Base64
     */
    downloadAvatar: async (path: string): Promise<string> => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path);
            if (error) throw error;

            return new Promise((resolve, reject) => {
                const fr = new FileReader();
                fr.readAsDataURL(data!);
                fr.onload = () => {
                    const uri = fr.result as string;
                    set({ avatarUri: uri });
                    resolve(uri);
                };
                fr.onerror = () => reject(new Error('Failed to read image blob'));
            });
        } catch (error) {
            console.error('Download failed', error);
            throw error;
        }
    },

    /**
     * Updates the User's database row
     */
    updateUserAvatarPath: async (userId: string, path: string) => {
        const { setAvatarPath } = useAuthStore.getState();

        const { error } = await supabase
            .from('users')
            .update({ avatar_url: path })
            .eq('id', userId);

        if (error) throw error;
        setAvatarPath(path)
    }
}));
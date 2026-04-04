import { useAuthStore } from '@/services/auth/supabaseAuth';
import { supabase } from '@/services/databases/supabase/supabase_client';
import { useClipsStore } from '@/services/userdata/supabaseClips';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';

export const TestUpload = () => {
    // 1. Get Logic
    const { uploadClip, uploading, error: uploadError } = useClipsStore();
    const { userid } = useAuthStore(); // Try getting ID from store first

    const [selectedVideo, setSelectedVideo] = useState<any>(null);

    const pickVideo = async () => {
        // FIXED: Deprecation warning solved by using MediaType.Videos (or MediaType.VIDEO depending on version)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            setSelectedVideo({
                uri: asset.uri,
                name: asset.fileName || 'test_video.mp4',
                type: asset.mimeType || 'video/mp4',
            });
        }
    };

    const handleUpload = async () => {
        if (!selectedVideo) {
            Alert.alert("Select Video", "Please pick a video first.");
            return;
        }

        // 2. ROBUST ID CHECK
        // If 'userid' from store is empty, fetch it directly from Supabase auth session
        let currentUserId = userid;

        if (!currentUserId) {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                currentUserId = user.id;
                console.log("Fetched ID directly from Supabase:", currentUserId);
            } else {
                Alert.alert("Authentication Error", "You are not logged in.");
                return;
            }
        }

        // Dummy Metadata for testing
        const TEST_METADATA = {
            location: { lat: 37.7749, long: -122.4194 },
            recordedAt: new Date(),
        };

        console.log(`Starting upload for User: ${currentUserId}`);

        // 3. Pass the resolved ID (currentUserId)
        await uploadClip(selectedVideo, currentUserId, TEST_METADATA);

        Alert.alert("Status", "Upload initiated. Check console/dashboard.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Upload Service Test</Text>

            <Button title="1. Pick Video" onPress={pickVideo} />

            {selectedVideo && (
                <Text style={styles.fileInfo}>Selected: {selectedVideo.name}</Text>
            )}

            {uploading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            ) : (
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="2. Test Upload Function"
                        onPress={handleUpload}
                        disabled={!selectedVideo}
                    />
                </View>
            )}

            {uploadError && <Text style={styles.errorText}>Error: {uploadError}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 30, gap: 15, backgroundColor: '#f0f0f0', borderRadius: 10, margin: 20 },
    header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    fileInfo: { fontStyle: 'italic', color: '#333' },
    errorText: { color: 'red', marginTop: 10, fontWeight: 'bold' }
});
import { localDatabase } from '@/services/databases/watermelondb/database';
import { ClipFetchingService } from '@/services/hardware/http/clipFetchingService';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useClipUploadSyncLogic = () => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncedCount, setSyncedCount] = useState(0);

    const pullFromPi = async () => {
        setIsSyncing(true);
        setSyncedCount(0);

        try {
            const count = await ClipFetchingService.syncAllSegments(localDatabase, (progress) => {
                setSyncedCount(progress);
            });

            if (count > 0) {
                Alert.alert("Sync Complete", `Pulled ${count} new clips from the camera.`);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Sync Error", "Failed to communicate with the Raspberry Pi.");
        } finally {
            setIsSyncing(false);
        }
    };

    return {
        isSyncing,
        syncedCount,
        pullFromPi,
    };
};
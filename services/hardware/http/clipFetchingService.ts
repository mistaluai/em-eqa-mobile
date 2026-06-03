import Clip from '@/services/databases/watermelondb/models/Clips';
import { extractFramesFromVideo } from '@/shared/utils/clipsUtilities';
import { Database } from '@nozbe/watermelondb';
import { PiNetworkService } from './piNetworkService';

// 1. Import modern classes for local disk management
import { Directory, File, Paths } from 'expo-file-system';
// 2. Import the legacy API specifically to capture HTTP headers during download
import * as FileSystemLegacy from 'expo-file-system/legacy';

export const ClipFetchingService = {
    processNextSegment: async (database: Database): Promise<{ status: 'success' | 'empty' | 'error', clipId?: string }> => {
        try {
            // Setup a temporary destination using the modern API
            const tempDir = new Directory(Paths.cache, 'clips', 'temp_download');
            tempDir.create({ intermediates: true, idempotent: true });
            const tempFile = new File(tempDir, 'clip.mp4');

            if (tempFile.exists) tempFile.delete();

            const downloadRes = await FileSystemLegacy.downloadAsync(
                PiNetworkService.getNextSegmentUrl(),
                tempFile.uri
            );

            // 204 indicates no more videos are available on the Pi
            if (downloadRes.status === 204) {
                tempFile.delete();
                return { status: 'empty' };
            }

            if (downloadRes.status !== 200) {
                tempFile.delete();
                throw new Error(`Network response was not ok: ${downloadRes.status}`);
            }

            // Extract metadata from the legacy response headers
            const headers = downloadRes.headers;
            const segmentIdStr = headers['x-segment-id'] || headers['X-Segment-Id'];
            const createdAtStr = headers['x-segment-created-at'] || headers['X-Segment-Created-At'];
            const durationStr = headers['x-segment-duration-ms'] || headers['X-Segment-Duration-Ms'];

            if (!segmentIdStr) {
                tempFile.delete();
                throw new Error("Missing Segment ID in response headers");
            }

            const clipId = `pi_seg_${segmentIdStr}`;
            const recordedAt = createdAtStr ? new Date(createdAtStr) : new Date();
            const durationMs = durationStr ? parseInt(durationStr, 10) : 10000;

            // MOVE STEP: Switch back to the modern API to move the file to its final home
            const finalDir = new Directory(Paths.cache, 'clips', clipId);
            finalDir.create({ intermediates: true, idempotent: true });
            const finalFile = new File(finalDir, 'clip.mp4');

            if (finalFile.exists) finalFile.delete();

            // Move the file from the temp location to the final location
            tempFile.move(finalFile);

            // Extract frames using the utility
            await extractFramesFromVideo(clipId, durationMs, 5);

            // Save the record to WatermelonDB
            await Clip.createNewClip(database, clipId, recordedAt);

            // Acknowledge and delete the video from the Pi
            await PiNetworkService.deleteSegment(parseInt(segmentIdStr, 10));

            return { status: 'success', clipId };

        } catch (error) {
            console.error("[ClipFetchingService] Error processing segment:", error);
            return { status: 'error' };
        }
    },

    syncAllSegments: async (database: Database, onProgress?: (syncedCount: number) => void) => {
        let isSyncing = true;
        let count = 0;

        while (isSyncing) {
            const result = await ClipFetchingService.processNextSegment(database);

            if (result.status === 'empty') {
                isSyncing = false;
            } else if (result.status === 'success') {
                count++;
                if (onProgress) onProgress(count);
            } else {
                isSyncing = false;
            }
        }
        return count;
    }
};
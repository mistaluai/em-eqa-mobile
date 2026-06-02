import { Directory, File, Paths } from 'expo-file-system';
import { MediaToolkit } from 'react-native-media-toolkit';

/**
 * Removes the 'file://' prefix from URI to be safely used with some native modules.
 */
const getNativePath = (uri: string) => uri.replace(/^file:\/\//, '');

/**
 * Receives a video Blob, saves it directly to the cache directory as an mp4.
 *
 * @param blob The Blob containing the video file received from an API.
 * @param clip_id The unique ID for this clip.
 * @returns The native path to the saved mp4 file.
 */
export const saveVideoBlob = async (
    blob: Blob,
    clip_id: string
): Promise<{ videoPath: string }> => {
    try {
        const clipDir = new Directory(Paths.cache, 'clips', clip_id);
        const videoFile = new File(clipDir, 'clip.mp4');

        // Ensure the clip directory exists
        clipDir.create({ intermediates: true, idempotent: true });

        // Convert Blob to Base64 to write to Expo FileSystem
        const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                // Strip out the Data URI prefix e.g. "data:video/mp4;base64,"
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        // Write the video file to disk
        videoFile.write(base64Data, { encoding: 'base64' });

        return { videoPath: getNativePath(videoFile.uri) };
    } catch (error) {
        console.error(`[saveVideoBlob] Error saving video for clip ${clip_id}:`, error);
        throw error;
    }
};

/**
 * Takes the saved video file and splits it into individual frame images.
 *
 * @param clip_id The ID of the clip to process.
 * @param durationMs The duration of the video in milliseconds.
 * @param fps (Optional) The extraction framerate. If omitted, extracts at 5 FPS.
 * @returns The native path to the folder containing the extracted frames.
 */
export const extractFramesFromVideo = async (
    clip_id: string,
    durationMs: number,
    fps: number = 5
): Promise<{ framesDir: string }> => {
    try {
        const clipDir = new Directory(Paths.cache, 'clips', clip_id);
        const framesDir = new Directory(clipDir, 'frames');
        const videoFile = new File(clipDir, 'clip.mp4');

        // Ensure the frames directory exists and is empty
        if (framesDir.exists) {
            framesDir.delete();
        }
        framesDir.create({ intermediates: true, idempotent: true });

        if (!videoFile.exists) {
            throw new Error(`Video file for clip ${clip_id} does not exist. Save it first.`);
        }

        // 1. Calculate the exact timestamp intervals in milliseconds
        const intervalMs = 1000 / fps;
        const timestamps: number[] = [];
        for (let t = 0; t <= durationMs; t += intervalMs) {
            timestamps.push(Math.floor(t));
        }

        // 2. Extract frames iteratively using MediaToolkit
        // NOTE: THIS CODE is sequential, we should consider batching after integrating it and testing it to make it faster
        let index = 1;
        for (const timeMs of timestamps) {
            const thumb = await MediaToolkit.getThumbnail(videoFile.uri, {
                timeMs: timeMs,
                quality: 90, // Matches your previous 0.9 preference
            });

            // 3. Rename and move the generated thumbnail
            const tempFrameFile = new File(thumb.uri);
            const paddedIndex = index.toString().padStart(6, '0');
            const destFile = new File(framesDir, `frame${paddedIndex}.jpg`);

            tempFrameFile.move(destFile);
            index++;
        }

        return { framesDir: getNativePath(framesDir.uri) };
    } catch (error) {
        console.error(`[extractFramesFromVideo] Error extracting frames for clip ${clip_id}:`, error);
        throw error;
    }
};

export interface CleanupOptions {
    frames?: boolean;
    video?: boolean;
    all?: boolean;
}

/**
 * Cleans up the specified targets relating to a clip.
 *
 * @param clip_id The clip ID to base operations off of.
 * @param options Selective cleanup. By default { all: true }
 */
export const cleanupClip = async (
    clip_id: string,
    options: CleanupOptions = { all: true }
) => {
    try {
        const clipDir = new Directory(Paths.cache, 'clips', clip_id);

        if (options.all) {
            if (clipDir.exists) clipDir.delete();
            return;
        }

        if (options.frames) {
            const framesDir = new Directory(clipDir, 'frames');
            if (framesDir.exists) framesDir.delete();
        }

        if (options.video) {
            const videoFile = new File(clipDir, 'clip.mp4');
            if (videoFile.exists) videoFile.delete();
        }
    } catch (error) {
        console.error(`[cleanupClip] Error cleaning up clip ${clip_id}:`, error);
        throw error;
    }
};
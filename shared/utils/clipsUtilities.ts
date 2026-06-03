import { Directory, File, Paths } from 'expo-file-system';
import { MediaToolkit } from 'react-native-media-toolkit';

/**
 * Removes the 'file://' prefix from URI to be safely used with some native modules.
 */
const getNativePath = (uri: string) => uri.replace(/^file:\/\//, '');

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

        if (framesDir.exists) {
            framesDir.delete();
        }
        framesDir.create({ intermediates: true, idempotent: true });

        if (!videoFile.exists) {
            throw new Error(`Video file for clip ${clip_id} does not exist. Save it first.`);
        }

        const intervalMs = 1000 / fps;
        const timestamps: number[] = [];
        for (let t = 0; t <= durationMs; t += intervalMs) {
            timestamps.push(Math.floor(t));
        }

        let index = 1;
        for (const timeMs of timestamps) {
            const thumb = await MediaToolkit.getThumbnail(videoFile.uri, {
                timeMs: timeMs,
                quality: 90,
            });

            const tempFrameFile = new File(thumb.uri);
            const paddedIndex = index.toString().padStart(6, '0');
            const destFile = new File(framesDir, `frame${paddedIndex}.jpg`);

            // Defensive check to avoid FileAlreadyExistsException
            if (destFile.exists) {
                destFile.delete();
            }

            tempFrameFile.copy(destFile);
            tempFrameFile.delete();
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
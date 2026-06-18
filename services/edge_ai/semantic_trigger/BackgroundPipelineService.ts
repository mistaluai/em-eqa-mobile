import { localDatabase } from '@/services/databases/watermelondb/database';
import Clip from '@/services/databases/watermelondb/models/Clips';
import { ClipFetchingService } from '@/services/hardware/http/clipFetchingService';
import { cleanupClip } from '@/shared/utils/clipsUtilities';
import { useClipsStore } from '@/services/databases/supabase/supabaseClips';
import { supabase } from '@/services/databases/supabase/supabase_client';
import { Directory, File, Paths } from 'expo-file-system';
import { ClipEvaluator } from './SemanticTrigger';
import { Q } from '@nozbe/watermelondb';

export class BackgroundPipelineService {
  static isIngesting = false;
  static activeEvaluations = 0;
  static MAX_CONCURRENT_EVALUATIONS = 1;
  static isUploading = false;
  static isGCing = false;

  /**
   * Phase 1: Ingestion & Extraction
   */
  static async tickPhase1() {
    if (this.isIngesting) return;
    this.isIngesting = true;
    console.log('[Pipeline] Phase 1: Syncing segments from hardware...');
    try {
      const count = await ClipFetchingService.syncAllSegments(localDatabase);
      console.log(`[Pipeline] Phase 1 Completed. Synced ${count} segments.`);
    } catch (error) {
      console.error('[Pipeline] Phase 1 Error:', error);
    } finally {
      this.isIngesting = false;
    }
  }

  /**
   * Phase 2: Semantic Evaluation
   */
  static async tickPhase2(imageModel: any, textModel: any, evaluator: ClipEvaluator) {
    if (this.activeEvaluations >= this.MAX_CONCURRENT_EVALUATIONS) return;
    this.activeEvaluations++;
    console.log(`[Pipeline] Phase 2: Starting Semantic Evaluation (Active: ${this.activeEvaluations})...`);
    try {
      const clip = await Clip.getNextUnprocessedClip(localDatabase);
      if (!clip) {
        console.log('[Pipeline] Phase 2: No unprocessed clips found.');
        return;
      }

      console.log(`[Pipeline] Phase 2: Evaluating clip ${clip.clipId}`);

      // Setup Target Embeddings dynamically (Using fixed array for now as requested)
      const targetActions = ['goal', 'celebration'];
      const textEmbeddings: Record<string, number[]> = {};

      for (const action of targetActions) {
        const arr = Array.from(await textModel.forward(action)) as number[];
        textEmbeddings[action] = arr;
      }
      evaluator.setTargetEmbeddings(textEmbeddings);

      // Read extracted frames
      const clipDir = new Directory(Paths.cache, 'clips', clip.clipId);
      const framesDir = new Directory(clipDir, 'frames');
      
      if (!framesDir.exists) {
         console.warn(`[Pipeline] Phase 2: Frames directory missing for ${clip.clipId}. Marking dismissed.`);
         await clip.updateRecordingStatus('dismissed');
         return;
      }

      const files = framesDir.list().filter((item): item is File => item instanceof File);
      if (files.length === 0) {
         console.warn(`[Pipeline] Phase 2: No frames found for ${clip.clipId}. Marking dismissed.`);
         await clip.updateRecordingStatus('dismissed');
         return;
      }

      // Sort files to ensure chronological order
      files.sort((a: File, b: File) => a.name.localeCompare(b.name));

      const visualEmbeddings: Float32Array[] = [];
      for (const file of files) {
        const embedding = await imageModel.forward(file.uri);
        visualEmbeddings.push(embedding);
      }

      // Evaluate
      const decision = evaluator.evaluateClip(visualEmbeddings);
      
      console.log(`[Pipeline] Phase 2: Clip ${clip.clipId} decision -> keep: ${decision.keep}`);
      
      // Update DB
      if (decision.keep) {
        await clip.updateRecordingStatus('recorded');
      } else {
        await clip.updateRecordingStatus('dismissed');
      }

      // Cleanup frames but leave .mp4 intact
      await cleanupClip(clip.clipId, { frames: true });
      console.log(`[Pipeline] Phase 2: Cleaned up frames for ${clip.clipId}`);

    } catch (error) {
      console.error('[Pipeline] Phase 2 Error:', error);
    } finally {
      this.activeEvaluations--;
    }
  }

  /**
   * Phase 3: The Upload Loop
   */
  static async tickPhase3() {
    if (this.isUploading) return;
    this.isUploading = true;
    console.log('[Pipeline] Phase 3: Starting Upload Loop...');
    try {
      const clip = await Clip.getOneUnsyncedClip(localDatabase);
      if (!clip) {
        console.log('[Pipeline] Phase 3: No unsynced clips found.');
        return;
      }

      console.log(`[Pipeline] Phase 3: Uploading clip ${clip.clipId}`);

      // 1. Resolve User ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
         console.warn('[Pipeline] Phase 3: User not authenticated. Aborting upload.');
         return;
      }

      // 2. Prepare File
      const clipDir = new Directory(Paths.cache, 'clips', clip.clipId);
      const videoFile = new File(clipDir, 'clip.mp4');
      
      if (!videoFile.exists) {
         console.warn(`[Pipeline] Phase 3: MP4 missing for ${clip.clipId}.`);
         return;
      }

      const clipFile = {
        uri: videoFile.uri,
        name: `${clip.clipId}.mp4`,
        type: 'video/mp4'
      };

      const metadata = {
        recordedAt: new Date(clip.recordedAt),
      };

      // 3. Upload using Zustand store directly
      await useClipsStore.getState().uploadClip(clipFile, user.id, metadata);
      
      // Check for errors (Since uploadClip sets error in state, we should check it)
      const uploadError = useClipsStore.getState().error;
      if (uploadError) {
         throw new Error(uploadError);
      }

      // 4. Mark as synced
      await clip.markAsSynced();
      console.log(`[Pipeline] Phase 3: Successfully uploaded ${clip.clipId}`);

    } catch (error) {
      console.error('[Pipeline] Phase 3 Error:', error);
    } finally {
      this.isUploading = false;
    }
  }

  /**
   * Phase 4: Garbage Collection
   */
  static async tickPhase4() {
    if (this.isGCing) return;
    this.isGCing = true;
    console.log('[Pipeline] Phase 4: Starting Garbage Collection...');
    try {
      const clipIds = await Clip.getSyncedOrDismissedClipIds(localDatabase);
      if (clipIds.length === 0) {
        console.log('[Pipeline] Phase 4: Nothing to garbage collect.');
        return;
      }

      for (const clipId of clipIds) {
        console.log(`[Pipeline] Phase 4: Cleaning up ${clipId}`);
        // Delete entirely from filesystem
        await cleanupClip(clipId, { all: true });

        // Delete from DB
        await localDatabase.write(async () => {
          const clipsToDel = await localDatabase.get<Clip>('clips').query(Q.where('clip_id', clipId)).fetch();
          for (const c of clipsToDel) {
            await c.destroyPermanently();
          }
        });
      }
      
      console.log(`[Pipeline] Phase 4: GC completed for ${clipIds.length} clips.`);

    } catch (error) {
      console.error('[Pipeline] Phase 4 Error:', error);
    } finally {
      this.isGCing = false;
    }
  }
}

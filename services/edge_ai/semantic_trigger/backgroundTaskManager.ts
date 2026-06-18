import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import { BackgroundPipelineService } from './BackgroundPipelineService';

const BACKGROUND_PIPELINE_TASK_ID = 'BACKGROUND_PIPELINE_TASK';

TaskManager.defineTask(BACKGROUND_PIPELINE_TASK_ID, async () => {
  console.log(`[BackgroundTask] Got background task call at date: ${new Date().toISOString()}`);
  try {
    // In the background, we only run phases that don't require heavy AI models
    // Phase 2 is skipped to prevent OOM and because React hooks aren't mounted

    console.log('[BackgroundTask] Running Phase 1 (Ingestion)...');
    await BackgroundPipelineService.tickPhase1();

    console.log('[BackgroundTask] Running Phase 3 (Upload)...');
    await BackgroundPipelineService.tickPhase3();

    console.log('[BackgroundTask] Running Phase 4 (Garbage Collection)...');
    await BackgroundPipelineService.tickPhase4();

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error('[BackgroundTask] Failed to execute the background task:', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

// Helper to register the task (Call this from your app startup code, e.g., in a useEffect in layout)
export async function registerBackgroundPipelineTask() {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_PIPELINE_TASK_ID);
    if (!isRegistered) {
      await BackgroundTask.registerTaskAsync(BACKGROUND_PIPELINE_TASK_ID, {
        minimumInterval: 5, // Run minimum every 15 minutes
      });
      console.log('[BackgroundTask] Registered successfully.');
    }
  } catch (error) {
    console.error('[BackgroundTask] Registration failed:', error);
  }
}

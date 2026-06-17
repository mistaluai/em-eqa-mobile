import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useSemanticModels } from './useSemanticModels';
import { useClipEvaluator } from './useSemanticTriggerState';
import { BackgroundPipelineService } from './BackgroundPipelineService';

export const PipelineOrchestrator = () => {
  const { imageModel, textModel, isReady } = useSemanticModels();
  const { evaluator } = useClipEvaluator();

  const isRunningRef = useRef(false);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
      if (nextAppState.match(/inactive|background/)) {
        console.log('[Orchestrator] App backgrounded, pipeline will yield.');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // We only want to run this loop if the models are ready and we are in the foreground
    if (!isReady || appState !== 'active') return;

    const intervalId = setInterval(async () => {
      if (isRunningRef.current) return;
      if (AppState.currentState !== 'active') return;

      isRunningRef.current = true;
      try {
        console.log('--- [Orchestrator] Starting Pipeline Tick ---');

        await BackgroundPipelineService.tickPhase1();
        
        if (AppState.currentState !== 'active') {
          console.log('[Orchestrator] Yielding after Phase 1');
          return;
        }

        await BackgroundPipelineService.tickPhase2(imageModel, textModel, evaluator);

        if (AppState.currentState !== 'active') {
          console.log('[Orchestrator] Yielding after Phase 2');
          return;
        }

        await BackgroundPipelineService.tickPhase3();

        if (AppState.currentState !== 'active') {
          console.log('[Orchestrator] Yielding after Phase 3');
          return;
        }

        await BackgroundPipelineService.tickPhase4();

        console.log('--- [Orchestrator] Pipeline Tick Complete ---');
      } catch (error) {
        console.error('[Orchestrator] Tick error:', error);
      } finally {
        isRunningRef.current = false;
      }
    }, 15000); // Tick every 15 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [isReady, appState, imageModel, textModel, evaluator]);

  return null; // This is a headless orchestrator component
};

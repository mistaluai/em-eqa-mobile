import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useSemanticModels } from './useSemanticModels';
import { useClipEvaluator } from './useSemanticTriggerState';
import { BackgroundPipelineService } from './BackgroundPipelineService';

export const PipelineOrchestrator = () => {
  const { imageModel, textModel, isReady } = useSemanticModels();
  const { evaluator } = useClipEvaluator();

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

    const intervalId = setInterval(() => {
      if (AppState.currentState !== 'active') return;

      try {
        console.log('--- [Orchestrator] Starting Pipeline Nudge ---');

        // Fire and forget (No await)
        BackgroundPipelineService.tickPhase1();
        BackgroundPipelineService.tickPhase2(imageModel, textModel, evaluator);
        BackgroundPipelineService.tickPhase3();
        BackgroundPipelineService.tickPhase4();

      } catch (error) {
        console.error('[Orchestrator] Tick error:', error);
      }
    }, 5000); // Tick every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [isReady, appState, imageModel, textModel, evaluator]);

  return null; // This is a headless orchestrator component
};

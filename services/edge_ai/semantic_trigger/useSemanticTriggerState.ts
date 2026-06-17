import { useMemo } from 'react';
import { ClipEvaluator } from './SemanticTrigger';

export interface ClipEvaluatorConfig {
  consistencyPercentage?: number; // K — fraction of frames needed (e.g. 0.60 = 60%)
  globalFloor?: number;           // Minimum Top-K average similarity to consider
  maxAllowedGap?: number;         // Maximum spread between Top-1 and Top-K scores
}

export function useClipEvaluator(config?: ClipEvaluatorConfig) {
  const evaluator = useMemo(() => new ClipEvaluator(
    config?.consistencyPercentage ?? 0.85,
    config?.globalFloor ?? 0.260,
    config?.maxAllowedGap ?? 0.015
  ), [config?.consistencyPercentage, config?.globalFloor, config?.maxAllowedGap]);

  return { evaluator };
}

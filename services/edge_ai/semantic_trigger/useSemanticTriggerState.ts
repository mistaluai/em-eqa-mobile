import { useMemo } from 'react';
import { ClipEvaluator } from './SemanticTrigger';

export interface ClipEvaluatorConfig {
  consistencyPercentage?: number; // K — fraction of frames needed (e.g. 0.60 = 60%)
  globalFloor?: number;           // Minimum Top-K average similarity to consider
  maxAllowedGap?: number;         // Maximum spread between Top-1 and Top-K scores
  minAllowedGap?: number;         // Minimum spread required (rejects static/blurry garbage)
}

export function useClipEvaluator(config?: ClipEvaluatorConfig) {
  const evaluator = useMemo(() => new ClipEvaluator(
    config?.consistencyPercentage ?? 0.40,  // Lowered to 40% so we only average the peak action frames
    config?.globalFloor ?? 0.258,           // Tighten the floor
    config?.maxAllowedGap ?? 0.050,         // Loosened max gap to allow dynamic actions
    config?.minAllowedGap ?? 0.012          // Rejects anything with gap < 0.012 (blurry/static videos)
  ), [config?.consistencyPercentage, config?.globalFloor, config?.maxAllowedGap, config?.minAllowedGap]);

  return { evaluator };
}

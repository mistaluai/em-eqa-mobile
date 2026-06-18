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
    config?.consistencyPercentage ?? 0.60,  // Increased to 60% for higher consistency requirement
    config?.globalFloor ?? 0.275,           // Higher floor for stricter similarity matching
    config?.maxAllowedGap ?? 0.040,         // Tighter max gap to ensure conceptual similarity
    config?.minAllowedGap ?? 0.015          // Stricter minimum gap to better reject static clips
  ), [config?.consistencyPercentage, config?.globalFloor, config?.maxAllowedGap, config?.minAllowedGap]);

  return { evaluator };
}

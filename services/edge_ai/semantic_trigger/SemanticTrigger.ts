export interface ClipDecision {
  keep: boolean;
  matchedActions: string[];
  actionStats: Record<string, ActionStat>;
}

export interface ActionStat {
  topKScores: number[];
  topKAvg: number;
  gap: number;
  passedMagnitude: boolean;
  passedVariance: boolean;
}

export class ClipEvaluator {
  private targetEmbeddings: Map<string, Float32Array> = new Map();

  private readonly consistencyPercentage: number;
  private readonly globalFloor: number;
  private readonly maxAllowedGap: number;
  private readonly minAllowedGap: number;

  constructor(
    consistencyPercentage = 0.60,
    globalFloor = 0.250, // Hard floor cut-off relative to chosen model representation
    maxAllowedGap = 0.050, // Ensures the Top-K frames actually look similar conceptually
    minAllowedGap = 0.010 // Ensures the clip actually has motion/variation (filters out static garbage)
  ) {
    this.consistencyPercentage = consistencyPercentage;
    this.globalFloor = globalFloor;
    this.maxAllowedGap = maxAllowedGap;
    this.minAllowedGap = minAllowedGap;
  }

  public setTargetEmbeddings(embeddings: Record<string, number[]>) {
    this.targetEmbeddings.clear();
    for (const [label, array] of Object.entries(embeddings)) {
      this.targetEmbeddings.set(label, new Float32Array(array));
    }
  }

  private dotProduct(a: Float32Array, b: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i];
    }
    return sum;
  }

  public evaluateClip(visualEmbeddings: Float32Array[]): ClipDecision {
    const N = visualEmbeddings.length;
    if (N === 0) return { keep: false, matchedActions: [], actionStats: {} };

    const K = Math.max(1, Math.ceil(N * this.consistencyPercentage));
    const matchedActions: string[] = [];
    const actionStats: Record<string, ActionStat> = {};

    // For every target action in the list, perform the evaluation completely independently
    for (const [label, textEmbedding] of this.targetEmbeddings.entries()) {
      
      // 1. Calculate raw similarities
      const scores = visualEmbeddings.map(vEmb => this.dotProduct(textEmbedding, vEmb));

      // 2. Sort descending
      scores.sort((a, b) => b - a);

      // 3. Isolate top K
      const topKScores = scores.slice(0, K);

      // 4. Calculate Magnitude Test
      const topKAvg = topKScores.reduce((sum, val) => sum + val, 0) / K;
      const passedMagnitude = topKAvg >= this.globalFloor;

      // 5. Calculate Variance Test (Gap)
      const gap = topKScores[0] - topKScores[topKScores.length - 1];
      const passedVariance = gap >= this.minAllowedGap && gap <= this.maxAllowedGap;

      // 6. Action validation
      if (passedMagnitude && passedVariance) {
        matchedActions.push(label);
      }

      actionStats[label] = {
        topKScores,
        topKAvg,
        gap,
        passedMagnitude,
        passedVariance
      };
    }

    return {
      keep: matchedActions.length > 0,
      matchedActions,
      actionStats
    };
  }
}

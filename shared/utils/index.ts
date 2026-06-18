// Shared utility functions

export * from './SemanticPrompts';
export * from './TextEmbeddingCache';

/**
 * Snaps a numeric value to the closest value in an array of options
 */
export const snapToClosestOption = (value: number, options: number[]): number => {
  return options.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};


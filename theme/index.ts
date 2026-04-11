// src/theme/index.ts
// Export all theme constants and styles
export { SPACING } from './spacing';
export { RADIUS } from './radius';
export { SHADOW } from './shadow';
export { CARD, createCardStyles } from './styles/global/CARD';
export { SCREEN, createScreenStyles } from './styles/global/SCREEN';
export { TEXT, createTextStyles } from './styles/global/TEXT';
export { TYPOGRAPHY } from './typography';
export * from './styles/global';

import { useThemeColor } from './useThemeColor';
import { createCardStyles } from './styles/global/CARD';
import { createScreenStyles } from './styles/global/SCREEN';
import { createTextStyles } from './styles/global/TEXT';

export const useGlobalStyles = () => {
  const COLORS = useThemeColor();
  return {
    SCREEN: createScreenStyles(COLORS),
    TEXT: createTextStyles(COLORS),
    CARD: createCardStyles(COLORS),
    COLORS,
  };
};


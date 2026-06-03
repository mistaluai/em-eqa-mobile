const PALETTE = {
  // Brand Colors
  ultraViolet: '#2F23C3',
  lightLavender: '#C5BAFF',
  desertSand: '#DF9711',

  // Premium Dark Canvas
  midnight: '#0B0D11', // Deep, rich background
  slate900: '#111827', // Surface level 1
  slate800: '#1E293B', // Surface level 2 (bubbles/inputs)
  slate700: '#334155', // Borders/Separators
  slate400: '#94A3B8', // Muted text
  slate200: '#E2E8F0', // Light text

  // Standard Grays
  white: '#FFFFFF',
  softGray: '#F2F2F7',
  gray800: '#1A1A1A',
  gray700: '#3A3A3A',
  gray200: '#EAEAEA',

  // Accent & Status
  red500: '#EF4444',
  indigo600: '#4F46E5',
  indigo400: '#818CF8', // Glowing primary for dark mode
  teal600: '#0D9488',
  blue500: '#3B82F6',
  emerald500: '#10B981',
};

export const lightTheme = {
  primary: PALETTE.ultraViolet,
  primaryLight: PALETTE.lightLavender,
  secondary: PALETTE.desertSand,

  backgroundLight: PALETTE.white,
  backgroundNeutral: PALETTE.softGray,
  backgroundDark: PALETTE.gray800,

  textPrimary: PALETTE.gray800,
  textSecondary: PALETTE.gray700,

  borderLight: PALETTE.gray200,
  borderDark: PALETTE.gray700,
  warning: PALETTE.red500,
  success: PALETTE.emerald500, // <-- Added success color here

  components: {
    navigation: {
      device: PALETTE.indigo600,
      timeline: PALETTE.teal600,
      privacy: PALETTE.red500,
      sync: PALETTE.desertSand,
      profile: PALETTE.blue500,
      status: PALETTE.emerald500,
      logoutBg: PALETTE.softGray,
    }
  }
};

export const darkTheme = {
  primary: PALETTE.indigo400, // Glowing indigo
  primaryLight: 'rgba(129, 140, 248, 0.15)',
  secondary: PALETTE.desertSand,

  backgroundLight: PALETTE.midnight,
  backgroundNeutral: PALETTE.slate800,
  backgroundDark: '#000000',

  textPrimary: PALETTE.slate200,
  textSecondary: PALETTE.slate400,

  borderLight: 'rgba(255, 255, 255, 0.1)',
  borderDark: PALETTE.slate700,
  warning: PALETTE.red500,
  success: PALETTE.emerald500, // <-- Added success color here

  components: {
    navigation: {
      ...lightTheme.components.navigation,
      logoutBg: PALETTE.slate800,
    }
  }
};

// KEEP static COLORS for backward compatibility until all components are migrated
export const COLORS = lightTheme;
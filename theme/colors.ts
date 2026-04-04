const PALETTE = {
  ultraViolet: '#2F23C3',
  lightLavender: '#C5BAFF',
  desertSand: '#df9711ff',
  white: '#FFFFFF',
  softGray: '#F2F2F7',
  gray800: '#1A1A1A',
  gray700: '#3A3A3A',
  gray200: '#EAEAEA',
  red500: '#dc2626',
  indigo600: '#4f46e5',
  teal600: '#0d9488',
  blue500: '#3b82f6',
  emerald500: '#10b981',
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

// Start with darkTheme holding same values or inverted where known, you can expand this later.
export const darkTheme = {
  ...lightTheme,
  backgroundLight: PALETTE.gray800,
  backgroundNeutral: PALETTE.gray700,
  textPrimary: PALETTE.white,
  textSecondary: PALETTE.gray200,
  borderLight: PALETTE.gray700,
};

// KEEP static COLORS for backward compatibility until all components are migrated
export const COLORS = lightTheme;
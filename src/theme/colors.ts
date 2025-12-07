export const COLORS = {
  // Primary/Action Colors (These are fine as they are meant to contrast)
  primary: '#2F23C3',         // ultraViolet
  primaryLight: '#C5BAFF',    // lightLavender

  // Secondary/Accent Color
  secondary: '#df9711ff',       // desertSand

  // Background Colors (For a Light UI)
  backgroundLight: '#FFFFFF', // UI CHANGE: Main canvas (White)
  backgroundNeutral: '#F2F2F7', // UI CHANGE: Secondary surface (Soft Gray)
  backgroundDark: '#1A1A1A', // Used for dark components (like a modal in dark mode, or not used in light mode)

  // Text/Content Colors (For a Light UI)
  textPrimary: '#1A1A1A',     // UI CHANGE: Dark text for readability (carbonBlack)
  textSecondary: '#3A3A3A',   // UI CHANGE: Medium gray for captions/subtle text (gray700)
  // Border/Separator Colors
  borderLight: '#EAEAEA',     // UI CHANGE: Light border on light background (gray200)
  borderDark: '#3A3A3A',      // Darker border if needed
  warning : 'red'
} as const;
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
  warning: 'red',
  
  // Navigation Hub Card Colors
  navDevice: '#4f46e5',       // indigo-600
  navTimeline: '#0d9488',     // teal-600
  navPrivacy: '#dc2626',      // red-600
  navSync: '#df9711ff',       // amber/orange (using secondary)
  navProfile: '#3b82f6',      // blue-500
  navStatus: '#10b981',       // emerald-500
  navLogoutBg: '#F2F2F7',     // backgroundNeutral for logout icon bg
} as const;
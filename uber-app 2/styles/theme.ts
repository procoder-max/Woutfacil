/**
 * Configuration des thèmes et couleurs de l'application
 */

export const COLORS = {
  // Couleurs principales
  primary: {
    50: "#e6f7f1",
    100: "#ccefe3",
    200: "#99dfc7",
    300: "#66cfab",
    400: "#33bf8f",
    500: "#10B981", // Couleur principale - Emerald
    600: "#0e9467",
    700: "#0b704e",
    800: "#074d34",
    900: "#04291a",
  },

  // Couleurs secondaires
  secondary: {
    50: "#eee6f7",
    100: "#ddccef",
    200: "#bb99df",
    300: "#9966cf",
    400: "#7733bf",
    500: "#6D28D9", // Couleur secondaire - Purple
    600: "#5720ae",
    700: "#421882",
    800: "#2c1057",
    900: "#16082b",
  },

  // Couleurs neutres
  neutral: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },

  // Couleurs d'état
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",

  // Couleurs spécifiques
  background: {
    dark: "#18181b",
    card: "#27272a",
    input: "#3f3f46",
  },
  text: {
    primary: "#ffffff",
    secondary: "#a1a1aa",
    disabled: "#52525b",
  },
  border: {
    light: "#3f3f46",
    medium: "#27272a",
    dark: "#18181b",
  },
}

export const FONTS = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  weights: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
}

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
}

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
}

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 9999,
}

// Thème global de l'application
export const theme = {
  colors: COLORS,
  fonts: FONTS,
  spacing: SPACING,
  shadows: SHADOWS,
  borderRadius: BORDER_RADIUS,
}

/**
 * Theme system replacing Tamagui
 * Maintains the same color palette and design tokens
 */

export const theme = {
  colors: {
    // Primary
    primary: "#090909",
    orange: "#FE8C00",
    background: "#FAFAF9",

    // Greys
    grey: "#f4f4f4",
    grey0: "#F1F1F1",
    grey1: "#EBEBE6",
    grey2: "#9C9C9C",
    grey3: "#292927",
    grey4: "#333333",
    grey5: "#EBEBED",
    grey6: "#F5F5F5",
    grey7: "#DDDDDD",
    grey8: "#E5E7EB",
    grey9: "#F6F6F8",

    // Grays (alternative spellings from Tamagui)
    gray3: "#292927",
    gray8: "#E5E7EB",
    gray10: "#878787",

    // Semantic
    black1: "#040404",
    slate1: "#425466",
    success0: "#1EA556",
    success1: "#1B9E14",
    red1: "#E74C3C",
    overlay: "rgba(0,0,0,0.5)",

    // UI specific
    white: "#FFFFFF",
    border: "#E5E7EB",
    text: "#040404",
    textSecondary: "#878787",
    textMuted: "#9C9C9C",

    // Status colors
    pending: "#F5A623",
    approved: "#1EA556",
    rejected: "#E74C3C",
    info: "#0077B6",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
    "4xl": 40,
    "5xl": 48,
    "6xl": 64,
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "7": 28,
    "8": 32,
    "9": 36,
    "10": 40,
    "12": 48,
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
    full: 9999,
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "12": 48,
  },

  typography: {
    fontFamily: {
      regular: "Roboto-Regular",
      medium: "Roboto-Medium",
      semibold: "Roboto-SemiBold",
      bold: "Roboto-Bold",
      light: "Roboto-Light",
    },
    sizes: {
      xs: 10,
      sm: 11,
      md: 13,
      base: 15,
      lg: 17,
      xl: 19,
      "2xl": 21,
      "3xl": 23,
      "4xl": 26,
      "5xl": 30,
    },
    lineHeight: {
      xs: 12,
      sm: 14,
      md: 18,
      base: 22,
      lg: 26,
      xl: 28,
      "2xl": 30,
    },
  },

  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
} as const;

export type Theme = typeof theme;

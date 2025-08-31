import { Theme, ThemeColors, ThemeFontSizes, ThemeSpacing, ThemeTypography, ThemeComponents } from "@theme/types";

const defaultColors: ThemeColors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  accent: "#FF9500",
  background: "#FFFFFF",
  surface: "#F2F2F7",
  text: "#000000",
  textSecondary: "#8E8E93",
  error: "#FF3B30",
  warning: "#FF9500",
  success: "#34C759",
};

const defaultFontSizes: ThemeFontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

const defaultSpacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const defaultTypography: ThemeTypography = {
  h1: {
    fontSize: defaultFontSizes.xxl,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: defaultFontSizes.xl,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  h3: {
    fontSize: defaultFontSizes.lg,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  body: {
    fontSize: defaultFontSizes.md,
    letterSpacing: 0.5,
  },
  button: {
    fontSize: defaultFontSizes.md,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: defaultFontSizes.sm,
    letterSpacing: 0.5,
  },
};

const defaultComponents: ThemeComponents = {
  Input: {
    base: {
      borderRadius: 0,
      padding: 0,
    },
    variants: {
      primary: {},
      secondary: {},
      tertiary: {},
    },
  },
};

const defaultTheme: Theme = {
  colors: defaultColors,
  fontSizes: defaultFontSizes,
  spacing: defaultSpacing,
  typography: defaultTypography,
  components: defaultComponents,
};

export default defaultTheme;
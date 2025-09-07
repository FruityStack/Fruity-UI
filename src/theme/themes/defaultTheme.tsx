import { InputDefaultTheme } from "@theme/components/input";
import { Theme, ThemeColors, ThemeFontSizes, ThemeSpacing, ThemeTypography, ThemeComponents, ThemeFontFamily } from "../types";
import { CarouselDefaultTheme } from "@theme/components/carousel";
import { WeekCalendarDefaultTheme } from "@theme/components/weekCalendar";

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
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

const defaultSpacing: ThemeSpacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const defaultFontFamily: ThemeFontFamily = {
  fontFamily: "System",
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

const defaultComponents = (theme: Theme): ThemeComponents => ({
  Input: InputDefaultTheme,
  Carousel: CarouselDefaultTheme,
  WeekCalendar: WeekCalendarDefaultTheme(theme),
});

const baseTheme: Omit<Theme, 'components'> = {
  colors: defaultColors,
  fontSizes: defaultFontSizes,
  spacing: defaultSpacing,
  typography: defaultTypography,
  fontFamily: defaultFontFamily,
};

const defaultTheme: Theme = {
  ...baseTheme,
  components: defaultComponents(baseTheme as Theme),
};

export default defaultTheme;

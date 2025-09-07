import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { Theme } from "../types";

export const WeekCalendarDefaultTheme = (theme: Theme) => ({
  base: {
    opacityRefDayBackground: 0,
    opacityRefDayBorder: 0.2,
    markedDayLabelColor: theme.colors.background,
  },
  variants: {
    primary: {},
    secondary: {},
    tertiary: {},
  },
});

export const WeekCalendarDarkTheme = (theme: Theme) => ({
  base: { 
    opacityRefDayBackground: 0.3,
    opacityRefDayBorder: 0,
    markedDayLabelColor: theme.colors.surface,
  },
  variants: {
    primary: {},
    secondary: {},
    tertiary: {},
  },
});

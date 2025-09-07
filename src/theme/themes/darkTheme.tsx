import { WeekCalendarDarkTheme } from "@theme/components/weekCalendar";
import { Theme, ThemeColors } from "../types";
import { createTheme } from "../utils";

const darkColors: ThemeColors = {
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  accent: '#FF9F0A',
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  error: '#FF453A',
  warning: '#FF9F0A',
  success: '#30D158'
};

const baseDarkTheme = createTheme({
  colors: darkColors,
});

const darkComponents: Partial<Theme["components"]> = {
  WeekCalendar: WeekCalendarDarkTheme(baseDarkTheme)
}

const darkTheme: Theme = {
  ...baseDarkTheme,
  components: {
    ...baseDarkTheme.components,
    ...darkComponents
  }
};

export default darkTheme;
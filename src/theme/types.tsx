import { InputStyleProps } from "@components/molecules/Input/Input.types";
import { TextStyle } from "react-native";

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  error: string;
  warning: string;
  success: string;
  [key: string]: string;
}

export interface ThemeFontSizes {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  [key: string]: number;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  [key: string]: number;
}

export interface ThemeTypography {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  body: TextStyle;
  button: TextStyle;
  caption: TextStyle;
  [key: string]: TextStyle;
}

export type ComponentConfig<TStyles, TVariant extends string = string> = {
  base?: Partial<TStyles>;
  variants?: Partial<Record<TVariant, Partial<TStyles>>>;
};

export interface ThemeComponents {
  [key: string]: ComponentConfig<any, any> | undefined;
}


export interface Theme {
  colors: ThemeColors;
  fontSizes: ThemeFontSizes;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  components?: ThemeComponents; 
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

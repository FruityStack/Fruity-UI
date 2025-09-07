import { defaultTheme } from "../../theme/themes";
import { DeepPartial, Theme, ThemeColors, ThemeFontFamily, ThemeFontSizes, ThemeSpacing, ThemeTypography } from "../../theme/types";

export function createTheme(customTheme: DeepPartial<Theme>): Theme {
  return {
    colors: {
      ...defaultTheme.colors,
      ...((customTheme.colors || {}) as Partial<ThemeColors>),
    } as ThemeColors,
    fontSizes: {
      ...defaultTheme.fontSizes,
      ...((customTheme.fontSizes || {}) as Partial<ThemeFontSizes>),
    } as ThemeFontSizes,
    spacing: {
      ...defaultTheme.spacing,
      ...((customTheme.spacing || {}) as Partial<ThemeSpacing>),
    } as ThemeSpacing,
    typography: {
      ...defaultTheme.typography,
      ...((customTheme.typography || {}) as Partial<ThemeTypography>),
    } as ThemeTypography,
    fontFamily: {
      ...defaultTheme.fontFamily,
      ...((customTheme.fontFamily || {}) as Partial<Theme["fontFamily"]>),
    } as ThemeFontFamily,
    ...Object.keys(customTheme).reduce((acc, key) => {
      if (!["colors", "fontSizes", "spacing", "typography"].includes(key)) {
        acc[key] = customTheme[key as keyof DeepPartial<Theme>];
      }
      return acc;
    }, {} as { [key: string]: any }),
  };
}

import React, { createContext, useContext, useState } from "react";
import { Theme, DeepPartial, ThemeContextType } from "@theme/types";
import { darkTheme, defaultTheme } from "@theme/themes";

function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  const output = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      output[key] = deepMerge((target as any)[key] || {}, source[key] as any);
    } else {
      (output as any)[key] = source[key];
    }
  }
  return output;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  overrides?: {
    light?: DeepPartial<Theme>;
    dark?: DeepPartial<Theme>;
  };
}> = ({ children, overrides }) => {
  const [isDark, setIsDark] = useState(false);

  const baseTheme = isDark ? darkTheme : defaultTheme;
  const appliedOverrides = isDark ? overrides?.dark || {} : overrides?.light || {};

  const theme = deepMerge(baseTheme, appliedOverrides);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};

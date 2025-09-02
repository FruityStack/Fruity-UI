import React, { createContext, useState, useMemo, useCallback } from "react";
import { Theme, DeepPartial, ThemeContextType } from "../types";
import { darkTheme, defaultTheme } from "../themes";

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
  initialMode?: "light" | "dark";
}> = ({ children, overrides, initialMode = "light" }) => {
  const [isDark, setIsDark] = useState(initialMode === "dark");

  const baseTheme = isDark ? darkTheme : defaultTheme;
  const appliedOverrides = useMemo(() => (isDark ? overrides?.dark || {} : overrides?.light || {}), [isDark, overrides?.dark, overrides?.light]);

  const theme = useMemo(() => deepMerge(baseTheme, appliedOverrides), [baseTheme, appliedOverrides]);

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  const contextValue = useMemo(() => ({ theme, isDark, toggleTheme }), [theme, isDark, toggleTheme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

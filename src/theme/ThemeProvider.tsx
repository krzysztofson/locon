import React, { createContext, useContext, useState } from "react";
import { Theme, ThemeVariant, lightTheme, darkTheme } from "./types";
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  components,
} from "./tokens";

const defaultTheme: Theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  components,
};

interface ThemeContextType {
  theme: Theme;
  variant: ThemeVariant;
  variantName: "light" | "dark";
  switchVariant: (variant: "light" | "dark") => void;
  updateVariant: (customVariant: Partial<ThemeVariant>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialVariant?: "light" | "dark";
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialVariant = "light",
}) => {
  const [variantName, setVariantName] = useState<"light" | "dark">(
    initialVariant
  );
  const [variant, setVariant] = useState<ThemeVariant>(
    initialVariant === "light" ? lightTheme : darkTheme
  );

  const switchVariant = (newVariant: "light" | "dark") => {
    setVariantName(newVariant);
    setVariant(newVariant === "light" ? lightTheme : darkTheme);
  };

  const updateVariant = (customVariant: Partial<ThemeVariant>) => {
    setVariant((prev) => ({ ...prev, ...customVariant }));
  };

  const contextValue: ThemeContextType = {
    theme: defaultTheme,
    variant,
    variantName,
    switchVariant,
    updateVariant,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Helper hook for accessing theme tokens directly
export const useThemeTokens = () => {
  const { theme } = useTheme();
  return theme;
};

// Helper hook for accessing current variant
export const useThemeVariant = () => {
  const { variant } = useTheme();
  return variant;
};

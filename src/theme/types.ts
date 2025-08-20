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

export interface Theme {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  transitions: typeof transitions;
  zIndex: typeof zIndex;
  components: typeof components;
}

// Type helpers for accessing theme values
export type ColorKey = keyof typeof colors;
export type SpacingKey = keyof typeof spacing;
export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;

// Theme variants for different contexts
export interface ThemeVariant {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
}

// Predefined theme variants
export const lightTheme: ThemeVariant = {
  primary: "#2C5282",
  secondary: "#FFFFFF",
  accent: "#50C878",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  text: "#333333",
  textSecondary: "#666666",
  border: "#E5E5E5",
};

export const darkTheme: ThemeVariant = {
  primary: "#2C5282",
  secondary: "#1F2937",
  accent: "#50C878",
  background: "#111827",
  surface: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#D1D5DB",
  border: "#374151",
};

// Component props with theme support
export interface ThemeProps {
  theme?: Theme;
  variant?: "light" | "dark" | "custom";
  customVariant?: Partial<ThemeVariant>;
}

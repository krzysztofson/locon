// Design System Tokens for Bezpieczna Rodzina
// Based on requirements: Primary #2C5282, Accents #50C878/#FF6B6B, Radius 12/8, System fonts

export const colors = {
  // Primary brand color (Blue)
  primary: {
    50: "#EBF4FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#2C5282", // Main primary color
    600: "#1E3A8A",
    700: "#1E40AF",
    800: "#1E3A8A",
    900: "#1E3A8A",
  },

  // Success/Positive color (Green)
  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#50C878", // Main success color
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
  },

  // Error/Danger color (Red)
  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#FF6B6B", // Main error color
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },

  // Warning color
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },

  // Neutral grays
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Background colors
  background: {
    primary: "#F5F5F5",
    secondary: "#FFFFFF",
    tertiary: "#FAFAFA",
  },

  // Text colors
  text: {
    primary: "#333333",
    secondary: "#666666",
    tertiary: "#999999",
    inverse: "#FFFFFF",
    disabled: "#CCCCCC",
  },

  // Border colors
  border: {
    primary: "#E5E5E5",
    secondary: "#D1D5DB",
    focus: "#2C5282",
  },

  // Special colors
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  xxxxxl: 48,
};

export const typography = {
  // Font families (system fonts as required)
  fontFamily: {
    system:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'SF Mono, Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
    "5xl": 36,
  },

  // Font weights
  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
  },
};

// Border radius (12px for cards, 8px for buttons as required)
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8, // For buttons
  md: 12, // For cards
  lg: 16,
  xl: 20,
  full: 9999,
};

// Shadows
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

// Animation/transition timings
export const transitions = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    linear: "linear",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },
};

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Component specific tokens
export const components = {
  button: {
    height: {
      sm: 32,
      md: 44,
      lg: 52,
    },
    padding: {
      sm: { x: 12, y: 6 },
      md: { x: 16, y: 12 },
      lg: { x: 20, y: 16 },
    },
  },
  input: {
    height: {
      sm: 36,
      md: 44,
      lg: 52,
    },
    padding: {
      x: 16,
      y: 12,
    },
  },
  card: {
    padding: {
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
  },
};

import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme, useThemeVariant } from "../../theme/ThemeProvider";

interface CardProps {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg" | "xl";
  shadow?: "none" | "sm" | "base" | "md" | "lg";
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = "md",
  shadow = "base",
  style,
}) => {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();

  const cardStyle: ViewStyle = {
    backgroundColor: themeVariant.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.components.card.padding[padding],
    shadowColor: theme.colors.black,
    shadowOffset:
      shadow !== "none" ? { width: 0, height: 2 } : { width: 0, height: 0 },
    shadowOpacity: shadow !== "none" ? 0.1 : 0,
    shadowRadius: shadow !== "none" ? 3.84 : 0,
    elevation: shadow !== "none" ? 5 : 0,
  };

  return <View style={[cardStyle, style]}>{children}</View>;
};

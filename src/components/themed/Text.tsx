import React from "react";
import {
  Text as RNText,
  TextStyle,
  TextProps as RNTextProps,
} from "react-native";
import { useTheme, useThemeVariant } from "../../theme/ThemeProvider";

interface TextProps extends RNTextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "label";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "inverse"
    | "success"
    | "error"
    | "warning";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  align?: "left" | "center" | "right" | "justify";
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  variant = "body",
  color = "primary",
  weight,
  size,
  align = "left",
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();

  const getTextStyles = (): TextStyle => {
    let baseStyles: TextStyle = {
      fontFamily: theme.typography.fontFamily.system,
      textAlign: align,
    };

    // Set variant-specific styles
    switch (variant) {
      case "h1":
        baseStyles = {
          ...baseStyles,
          fontSize: theme.typography.fontSize["4xl"],
          fontWeight: theme.typography.fontWeight.bold,
          lineHeight: theme.typography.lineHeight.tight,
        };
        break;
      case "h2":
        baseStyles = {
          ...baseStyles,
          fontSize: theme.typography.fontSize["3xl"],
          fontWeight: theme.typography.fontWeight.bold,
          lineHeight: theme.typography.lineHeight.tight,
        };
        break;
      case "h3":
        baseStyles = {
          ...baseStyles,
          fontSize: theme.typography.fontSize["2xl"],
          fontWeight: theme.typography.fontWeight.semibold,
          lineHeight: theme.typography.lineHeight.tight,
        };
        break;
      case "h4":
        baseStyles = {
          ...baseStyles,
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.semibold,
          lineHeight: theme.typography.lineHeight.normal,
        };
        break;
      case "body":
        baseStyles = {
          ...baseStyles,
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.normal,
          lineHeight: theme.typography.lineHeight.normal,
        };
        break;
      case "caption":
        baseStyles = {
          ...baseStyles,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.normal,
          lineHeight: theme.typography.lineHeight.normal,
        };
        break;
      case "label":
        baseStyles = {
          ...baseStyles,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          lineHeight: theme.typography.lineHeight.normal,
        };
        break;
    }

    // Override with size prop if provided
    if (size) {
      baseStyles.fontSize = theme.typography.fontSize[size];
    }

    // Override with weight prop if provided
    if (weight) {
      baseStyles.fontWeight = theme.typography.fontWeight[weight];
    }

    // Set color
    switch (color) {
      case "primary":
        baseStyles.color = themeVariant.text;
        break;
      case "secondary":
        baseStyles.color = themeVariant.textSecondary;
        break;
      case "tertiary":
        baseStyles.color = theme.colors.text.tertiary;
        break;
      case "inverse":
        baseStyles.color = theme.colors.text.inverse;
        break;
      case "success":
        baseStyles.color = theme.colors.success[500];
        break;
      case "error":
        baseStyles.color = theme.colors.error[500];
        break;
      case "warning":
        baseStyles.color = theme.colors.warning[500];
        break;
    }

    return baseStyles;
  };

  return (
    <RNText style={[getTextStyles(), style]} {...props}>
      {children}
    </RNText>
  );
};

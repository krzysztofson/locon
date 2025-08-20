import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme, useThemeVariant } from "../../theme/ThemeProvider";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "success" | "error" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();

  const getButtonStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      borderRadius: theme.borderRadius.base,
      alignItems: "center",
      justifyContent: "center",
      ...theme.components.button.padding[size],
      height: theme.components.button.height[size],
    };

    if (fullWidth) {
      baseStyles.width = "100%";
    }

    if (disabled) {
      baseStyles.opacity = 0.6;
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyles,
          backgroundColor: themeVariant.primary,
        };
      case "secondary":
        return {
          ...baseStyles,
          backgroundColor: themeVariant.secondary,
          borderWidth: 1,
          borderColor: themeVariant.border,
        };
      case "success":
        return {
          ...baseStyles,
          backgroundColor: theme.colors.success[500],
        };
      case "error":
        return {
          ...baseStyles,
          backgroundColor: theme.colors.error[500],
        };
      case "outline":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: themeVariant.primary,
        };
      default:
        return baseStyles;
    }
  };

  const getTextStyles = (): TextStyle => {
    const baseTextStyles: TextStyle = {
      fontFamily: theme.typography.fontFamily.system,
      fontWeight: theme.typography.fontWeight.semibold,
      fontSize:
        size === "sm"
          ? theme.typography.fontSize.sm
          : size === "lg"
          ? theme.typography.fontSize.lg
          : theme.typography.fontSize.base,
    };

    switch (variant) {
      case "primary":
      case "success":
      case "error":
        return {
          ...baseTextStyles,
          color: theme.colors.white,
        };
      case "secondary":
        return {
          ...baseTextStyles,
          color: themeVariant.text,
        };
      case "outline":
        return {
          ...baseTextStyles,
          color: themeVariant.primary,
        };
      default:
        return baseTextStyles;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[getTextStyles(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

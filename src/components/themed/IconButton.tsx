import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { useTheme, useThemeVariant } from "../../theme/ThemeProvider";

interface IconButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon: React.ReactNode;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = "secondary",
  size = "md",
  icon,
  style,
  disabled = false,
  ...props
}) => {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();

  const getButtonStyles = (): ViewStyle => {
    let baseStyles: ViewStyle = {
      borderRadius: theme.borderRadius.base,
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.5 : 1,
    };

    // Set size
    switch (size) {
      case "sm":
        baseStyles = {
          ...baseStyles,
          width: 32,
          height: 32,
        };
        break;
      case "md":
        baseStyles = {
          ...baseStyles,
          width: 40,
          height: 40,
        };
        break;
      case "lg":
        baseStyles = {
          ...baseStyles,
          width: 48,
          height: 48,
        };
        break;
    }

    // Set variant styles
    switch (variant) {
      case "primary":
        baseStyles.backgroundColor = theme.colors.primary[500];
        break;
      case "secondary":
        baseStyles.backgroundColor = themeVariant.surface;
        baseStyles.borderWidth = 1;
        baseStyles.borderColor = themeVariant.border;
        break;
      case "ghost":
        baseStyles.backgroundColor = "transparent";
        break;
      case "danger":
        baseStyles.backgroundColor = theme.colors.error[500];
        break;
    }

    return baseStyles;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {icon}
    </TouchableOpacity>
  );
};

import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { useTheme, useThemeVariant } from "../../theme/ThemeProvider";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled";
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  size = "md",
  variant = "outline",
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getInputStyles = (): TextStyle & ViewStyle => {
    const baseStyles: TextStyle & ViewStyle = {
      fontFamily: theme.typography.fontFamily.system,
      fontSize: theme.typography.fontSize.base,
      height: theme.components.input.height[size],
      paddingHorizontal: theme.components.input.padding.x,
      paddingVertical: theme.components.input.padding.y,
      borderRadius: theme.borderRadius.base,
      color: themeVariant.text,
    };

    if (variant === "outline") {
      return {
        ...baseStyles,
        backgroundColor: themeVariant.surface,
        borderWidth: 1,
        borderColor: error
          ? theme.colors.error[500]
          : isFocused
          ? themeVariant.primary
          : themeVariant.border,
      };
    } else {
      return {
        ...baseStyles,
        backgroundColor: theme.colors.gray[100],
        borderWidth: 0,
      };
    }
  };

  const getLabelStyles = (): TextStyle => ({
    fontFamily: theme.typography.fontFamily.system,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: themeVariant.text,
    marginBottom: theme.spacing.sm,
  });

  const getErrorStyles = (): TextStyle => ({
    fontFamily: theme.typography.fontFamily.system,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.error[500],
    marginTop: theme.spacing.xs,
  });

  return (
    <View style={containerStyle}>
      {label && <Text style={[getLabelStyles(), labelStyle]}>{label}</Text>}
      <TextInput
        style={[getInputStyles(), inputStyle]}
        placeholderTextColor={theme.colors.text.tertiary}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
      />
      {error && <Text style={[getErrorStyles(), errorStyle]}>{error}</Text>}
    </View>
  );
};

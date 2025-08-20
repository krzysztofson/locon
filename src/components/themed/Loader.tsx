import React from "react";
import { View, ActivityIndicator, ViewStyle } from "react-native";
import { useTheme, useThemeVariant } from "../../theme/ThemeProvider";
import { Text } from "./Text";

interface LoaderProps {
  size?: "small" | "large";
  color?: "primary" | "secondary" | "white";
  message?: string;
  overlay?: boolean;
  style?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = "primary",
  message,
  overlay = false,
  style,
}) => {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();

  const getIndicatorColor = () => {
    switch (color) {
      case "primary":
        return theme.colors.primary[500];
      case "secondary":
        return themeVariant.textSecondary;
      case "white":
        return theme.colors.white;
      default:
        return theme.colors.primary[500];
    }
  };

  const loaderContent = (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          gap: theme.spacing.md,
        },
        !overlay && style,
      ]}
    >
      <ActivityIndicator size={size} color={getIndicatorColor()} />
      {message && (
        <Text variant="caption" color="secondary" align="center">
          {message}
        </Text>
      )}
    </View>
  );

  if (overlay) {
    return (
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            alignItems: "center",
            justifyContent: "center",
            zIndex: theme.zIndex.modal,
          },
          style,
        ]}
      >
        <View
          style={{
            backgroundColor: themeVariant.surface,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.xl,
            minWidth: 120,
            alignItems: "center",
          }}
        >
          {loaderContent}
        </View>
      </View>
    );
  }

  return loaderContent;
};

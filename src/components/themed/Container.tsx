import React from "react";
import {
  View,
  ViewProps,
  ViewStyle,
  ScrollView,
  ScrollViewProps,
} from "react-native";
import { useTheme, useThemeVariant } from "../../theme/ThemeProvider";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  margin?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "primary" | "secondary" | "surface" | "transparent";
  scrollable?: boolean;
  scrollViewProps?: Omit<ScrollViewProps, "children">;
  safeArea?: boolean;
  centered?: boolean;
  style?: ViewStyle;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  padding = "md",
  margin = "none",
  background = "primary",
  scrollable = false,
  scrollViewProps,
  safeArea = false,
  centered = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();

  const getContainerStyles = (): ViewStyle => {
    let containerStyles: ViewStyle = {
      flex: 1,
    };

    // Set padding
    if (padding !== "none") {
      const paddingValue = theme.spacing[padding];
      containerStyles.padding = paddingValue;
    }

    // Set margin
    if (margin !== "none") {
      const marginValue = theme.spacing[margin];
      containerStyles.margin = marginValue;
    }

    // Set background color
    switch (background) {
      case "primary":
        containerStyles.backgroundColor = themeVariant.background;
        break;
      case "secondary":
        containerStyles.backgroundColor = themeVariant.secondary;
        break;
      case "surface":
        containerStyles.backgroundColor = themeVariant.surface;
        break;
      case "transparent":
        containerStyles.backgroundColor = "transparent";
        break;
    }

    // Add safe area padding if needed
    if (safeArea) {
      const currentPadding =
        typeof containerStyles.paddingTop === "number"
          ? containerStyles.paddingTop
          : 0;
      containerStyles.paddingTop = currentPadding + 44; // iOS status bar height
    }

    // Center content if requested
    if (centered) {
      containerStyles.justifyContent = "center";
      containerStyles.alignItems = "center";
    }

    return containerStyles;
  };

  const containerStyle = [getContainerStyles(), style];

  if (scrollable) {
    return (
      <ScrollView
        style={containerStyle}
        contentContainerStyle={
          centered ? { flexGrow: 1, justifyContent: "center" } : undefined
        }
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  );
};

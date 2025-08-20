import React from "react";
import { Text as RNText, StyleSheet } from "react-native";

interface TextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "caption";
  style?: any;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  style,
}) => {
  return (
    <RNText style={[styles.base, styles[variant], style]}>{children}</RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: "#2D3748",
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C5282",
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2C5282",
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C5282",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    color: "#718096",
  },
});

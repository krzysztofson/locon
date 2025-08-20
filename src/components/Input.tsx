import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "number-pad" | "phone-pad" | "email-address";
  maxLength?: number;
  style?: any;
  textAlign?: "left" | "center" | "right";
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  maxLength,
  style,
  textAlign = "left",
}) => {
  return (
    <TextInput
      style={[styles.input, { textAlign }, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      maxLength={maxLength}
      placeholderTextColor="#999"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#2D3748",
  },
});

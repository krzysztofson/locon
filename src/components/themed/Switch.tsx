import React from "react";
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

interface SwitchProps extends RNSwitchProps {
  size?: "sm" | "md" | "lg";
}

export const Switch: React.FC<SwitchProps> = ({
  size = "md",
  value,
  onValueChange,
  disabled = false,
  ...props
}) => {
  const { theme } = useTheme();

  const getTransformScale = () => {
    switch (size) {
      case "sm":
        return 0.8;
      case "md":
        return 1.0;
      case "lg":
        return 1.2;
      default:
        return 1.0;
    }
  };

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: disabled ? theme.colors.gray[300] : theme.colors.gray[200],
        true: disabled ? theme.colors.primary[300] : theme.colors.primary[500],
      }}
      thumbColor={
        value
          ? theme.colors.white
          : disabled
          ? theme.colors.gray[400]
          : theme.colors.white
      }
      style={{
        transform: [
          { scaleX: getTransformScale() },
          { scaleY: getTransformScale() },
        ],
      }}
      {...props}
    />
  );
};

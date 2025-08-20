import React from "react";
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { useTheme, useThemeVariant } from "../../theme/ThemeProvider";
import { Text } from "./Text";
import { Button } from "./Button";

interface ModalProps extends Omit<RNModalProps, "children"> {
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "full";
  dismissOnBackdrop?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  footerActions?: Array<{
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "error" | "success" | "outline";
  }>;
  style?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  visible = false,
  onClose,
  size = "md",
  dismissOnBackdrop = true,
  showCloseButton = true,
  showHeader = true,
  showFooter = false,
  footerActions = [],
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();

  const getModalStyles = (): ViewStyle => {
    let modalStyles: ViewStyle = {
      backgroundColor: themeVariant.surface,
      borderRadius: theme.borderRadius.md,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    };

    switch (size) {
      case "sm":
        modalStyles = {
          ...modalStyles,
          width: "80%",
          maxWidth: 400,
        };
        break;
      case "md":
        modalStyles = {
          ...modalStyles,
          width: "90%",
          maxWidth: 500,
        };
        break;
      case "lg":
        modalStyles = {
          ...modalStyles,
          width: "95%",
          maxWidth: 700,
        };
        break;
      case "full":
        modalStyles = {
          ...modalStyles,
          width: "100%",
          height: "100%",
          borderRadius: 0,
        };
        break;
    }

    return modalStyles;
  };

  const handleBackdropPress = () => {
    if (dismissOnBackdrop && onClose) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...props}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing.md,
          }}
        >
          <TouchableWithoutFeedback>
            <View style={[getModalStyles(), style]}>
              {showHeader && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: theme.spacing.lg,
                    borderBottomWidth: 1,
                    borderBottomColor: themeVariant.border,
                  }}
                >
                  {title && (
                    <Text variant="h4" weight="semibold">
                      {title}
                    </Text>
                  )}
                  {showCloseButton && onClose && (
                    <TouchableOpacity
                      onPress={onClose}
                      style={{
                        padding: theme.spacing.sm,
                        marginRight: -theme.spacing.sm,
                      }}
                    >
                      <Text size="lg" color="secondary">
                        ✕
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <View style={{ padding: theme.spacing.lg }}>{children}</View>

              {showFooter && footerActions.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: theme.spacing.sm,
                    padding: theme.spacing.lg,
                    borderTopWidth: 1,
                    borderTopColor: themeVariant.border,
                  }}
                >
                  {footerActions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant || "secondary"}
                      size="sm"
                      onPress={action.onPress}
                      title={action.label}
                    />
                  ))}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

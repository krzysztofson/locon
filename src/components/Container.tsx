import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  style?: any;
}

export const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
  },
});

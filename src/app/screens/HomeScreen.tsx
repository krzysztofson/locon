import React from "react";
import { View, StyleSheet } from "react-native";
import { HomeMapScreen } from "./HomeMapScreen";

export const HomeScreen: React.FC = () => {
  try {
  return <HomeMapScreen />;
  } catch (error) {
  return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

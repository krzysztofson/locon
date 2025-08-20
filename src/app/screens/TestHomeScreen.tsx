import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TestHomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ekran Mapy - Test</Text>
      <Text style={styles.subtitle}>
        Ten ekran powinien być widoczny po kliknięciu zakładki "Mapa"
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C5282",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
});

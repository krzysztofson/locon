import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../../components/themed/Button";

export const TestZonesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista Stref - Test</Text>
      <Text style={styles.subtitle}>
        Ten ekran powinien być widoczny po kliknięciu zakładki "Strefy"
      </Text>
      <Button
        title="Test Button"
        onPress={() => console.log("Test button pressed")}
        style={styles.button}
      />
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
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

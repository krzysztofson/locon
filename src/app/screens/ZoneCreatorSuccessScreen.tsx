import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ZonesStackParamList } from "../navigation/types";

type ZoneCreatorSuccessNavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZoneCreatorSuccess"
>;

export const ZoneCreatorSuccessScreen: React.FC = () => {
  const navigation = useNavigation<ZoneCreatorSuccessNavigationProp>();

  const handleGoToZones = () => {
    navigation.navigate("ZonesList");
  };

  const handleAddAnother = () => {
    navigation.navigate("ZoneCreatorStep1");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✅</Text>
        </View>

        <Text style={styles.title}>Strefa została utworzona!</Text>

        <Text style={styles.description}>
          Dzięki ustawieniu strefy zawsze otrzymasz automatyczny alert, gdy Twój
          Bliski wejdzie lub wyjdzie z wyznaczonego obszaru.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleGoToZones}
        >
          <Text style={styles.primaryButtonText}>Przejdź do stref</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleAddAnother}
        >
          <Text style={styles.secondaryButtonText}>Dodaj kolejną</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  successIcon: {
    marginBottom: 30,
  },
  checkmark: {
    fontSize: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#2C5282",
    width: "100%",
  },
  secondaryButtonText: {
    color: "#2C5282",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

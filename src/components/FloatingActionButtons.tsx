import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface FloatingActionButtonsProps {
  onAddZone: () => void;
  onZonesList: () => void;
  onSettings: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onAddZone,
  onZonesList,
  onSettings,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.secondaryFab} onPress={onSettings}>
        <Text style={styles.fabIcon}>⚙️</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryFab} onPress={onZonesList}>
        <Text style={styles.fabIcon}>📋</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryFab} onPress={onAddZone}>
        <Text style={styles.primaryFabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 34,
    right: 16,
    alignItems: "flex-end",
    gap: 12,
  },
  primaryFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  secondaryFab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  primaryFabIcon: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  fabIcon: {
    fontSize: 20,
  },
});

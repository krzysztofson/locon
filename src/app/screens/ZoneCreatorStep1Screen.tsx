import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ZonesStackParamList } from "../navigation/types";

type ZoneCreatorStep1NavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZoneCreatorStep1"
>;

export const ZoneCreatorStep1Screen: React.FC = () => {
  const navigation = useNavigation<ZoneCreatorStep1NavigationProp>();
  const [zoneName, setZoneName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("🏠");

  const icons = [
    "🏠",
    "🏫",
    "🏢",
    "🏬",
    "🏥",
    "🏛",
    "⛪",
    "🕌",
    "🏟",
    "🏞",
    "🎡",
    "🎢",
    "🎠",
    "⚽",
    "🏀",
    "🏈",
    "🎾",
    "🏓",
    "🏸",
    "🏒",
    "🏑",
    "🥊",
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚎",
    "🏍",
    "🚲",
    "🛴",
    "🛺",
    "🚁",
  ];

  const handleNext = () => {
    if (zoneName.trim() && selectedIcon) {
      navigation.navigate("ZoneCreatorStep2", {
        name: zoneName.trim(),
        icon: selectedIcon,
      });
    }
  };

  const canContinue = zoneName.trim().length > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.stepText}>Krok 1 z 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "25%" }]} />
        </View>

        <Text style={styles.title}>Nadaj nazwę strefie</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Wpisz nazwę"
            value={zoneName}
            onChangeText={setZoneName}
            placeholderTextColor="#999999"
          />
        </View>

        <Text style={styles.sectionTitle}>Wybierz ikonę</Text>

        <View style={styles.iconsGrid}>
          {icons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.iconButton,
                selectedIcon === icon && styles.selectedIconButton,
              ]}
              onPress={() => setSelectedIcon(icon)}
            >
              <Text style={styles.iconText}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !canContinue && styles.disabledButton]}
          onPress={handleNext}
          disabled={!canContinue}
        >
          <Text
            style={[
              styles.nextButtonText,
              !canContinue && styles.disabledButtonText,
            ]}
          >
            Dalej
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 20,
  },
  stepText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    marginBottom: 30,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2C5282",
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 20,
  },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 40,
    justifyContent: "space-between",
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedIconButton: {
    borderColor: "#2C5282",
    backgroundColor: "#E6F3FF",
  },
  iconText: {
    fontSize: 24,
  },
  nextButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledButtonText: {
    color: "#999999",
  },
});

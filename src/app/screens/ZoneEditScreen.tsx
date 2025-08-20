import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ZonesStackParamList } from "../navigation/types";

type ZoneEditNavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZoneEdit"
>;
type ZoneEditRouteProp = RouteProp<ZonesStackParamList, "ZoneEdit">;

export const ZoneEditScreen: React.FC = () => {
  const navigation = useNavigation<ZoneEditNavigationProp>();
  const route = useRoute<ZoneEditRouteProp>();
  const { zoneId } = route.params;

  // Mock zone data - in real app this would come from Redux store
  const [zoneName, setZoneName] = useState("Dom");
  const [zoneIcon, setZoneIcon] = useState("🏠");
  const [address, setAddress] = useState("ul. Przykładowa 1");
  const [radius, setRadius] = useState(250);

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
  ];

  const handleSave = () => {
    // In a real app, we would update the zone here
    console.log("Updating zone:", {
      id: zoneId,
      name: zoneName,
      icon: zoneIcon,
      address,
      radius,
    });
    navigation.navigate("ZonesList");
  };

  const handleDelete = () => {
    Alert.alert(
      "Usuń strefę",
      "Czy na pewno chcesz usunąć tę strefę? Ta akcja jest nieodwracalna.",
      [
        {
          text: "Anuluj",
          style: "cancel",
        },
        {
          text: "Usuń",
          style: "destructive",
          onPress: () => {
            // In a real app, we would delete the zone here
            console.log("Deleting zone:", zoneId);
            navigation.navigate("ZonesList");
          },
        },
      ]
    );
  };

  const adjustRadius = (newRadius: number) => {
    const clampedRadius = Math.max(100, Math.min(5000, newRadius));
    setRadius(clampedRadius);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Nazwa strefy</Text>
        <TextInput
          style={styles.input}
          value={zoneName}
          onChangeText={setZoneName}
          placeholder="Wpisz nazwę"
        />

        <Text style={styles.sectionTitle}>Ikona</Text>
        <View style={styles.iconsGrid}>
          {icons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.iconButton,
                zoneIcon === icon && styles.selectedIconButton,
              ]}
              onPress={() => setZoneIcon(icon)}
            >
              <Text style={styles.iconText}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Adres</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Wpisz adres"
        />

        <Text style={styles.sectionTitle}>Promień strefy</Text>
        <Text style={styles.radiusValue}>{radius} m</Text>
        <View style={styles.radiusControls}>
          <TouchableOpacity
            style={styles.radiusButton}
            onPress={() => adjustRadius(radius - 50)}
            disabled={radius <= 100}
          >
            <Text style={styles.radiusButtonText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radiusButton}
            onPress={() => adjustRadius(radius + 50)}
            disabled={radius >= 5000}
          >
            <Text style={styles.radiusButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Usuń strefę</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 15,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginBottom: 20,
  },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
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
  radiusValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C5282",
    marginBottom: 15,
  },
  radiusControls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 40,
  },
  radiusButton: {
    width: 50,
    height: 50,
    backgroundColor: "#2C5282",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  radiusButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FF6B6B",
  },
  deleteButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

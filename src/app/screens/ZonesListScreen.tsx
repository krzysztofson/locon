import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ZonesStackParamList } from "../navigation/types";

type ZonesListNavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZonesList"
>;

export const ZonesListScreen: React.FC = () => {
  const navigation = useNavigation<ZonesListNavigationProp>();

  // Mock data - this would come from Redux store in real app
  const zones = [
    {
      id: "1",
      name: "Dom",
      address: "ul. Przykładowa 1",
      devices: "1 telefon, 1 zegarek",
      icon: "🏠",
    },
    {
      id: "2",
      name: "Szkoła",
      address: "ul. Szkolna 15",
      devices: "1 zegarek",
      icon: "🏫",
    },
  ];

  const hasZones = zones.length > 0;

  const handleAddZone = () => {
    navigation.navigate("ZoneCreatorStep1");
  };

  const handleZonePress = (zoneId: string) => {
    navigation.navigate("ZoneEdit", { zoneId });
  };

  if (!hasZones) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.emptyState}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🏠</Text>
            <Text style={styles.icon}>🏫</Text>
          </View>

          <Text style={styles.title}>Czym są strefy bezpieczeństwa?</Text>

          <View style={styles.featureList}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureText}>
                Otrzymuj automatyczne powiadomienia gdy Twoi bliscy wejdą lub
                wyjdą z ważnych miejsc
              </Text>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📍</Text>
              <Text style={styles.featureText}>
                Ustaw strefy wokół domu, szkoły, pracy czy placu zabaw
              </Text>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🛡</Text>
              <Text style={styles.featureText}>
                Bądź spokojny wiedząc, że Twoi bliscy są bezpieczni w
                określonych miejscach
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddZone}>
            <Text style={styles.addButtonText}>Dodaj pierwszą strefę</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          Ustaw strefę i otrzymuj powiadomienia gdy Bliski się w niej pojawi lub
          ją opuści.
        </Text>
      </View>

      <View style={styles.zonesList}>
        {zones.map((zone) => (
          <TouchableOpacity
            key={zone.id}
            style={styles.zoneCard}
            onPress={() => handleZonePress(zone.id)}
          >
            <View style={styles.zoneInfo}>
              <Text style={styles.zoneIcon}>{zone.icon}</Text>
              <View style={styles.zoneDetails}>
                <Text style={styles.zoneName}>{zone.name}</Text>
                <Text style={styles.zoneAddress}>{zone.address}</Text>
                <Text style={styles.zoneDevices}>{zone.devices}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addZoneButton} onPress={handleAddZone}>
        <Text style={styles.addZoneButtonText}>+ Dodaj strefę</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  featureList: {
    width: "100%",
    marginBottom: 30,
  },
  feature: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 15,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: "#666666",
    lineHeight: 22,
  },
  addButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    padding: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  zonesList: {
    paddingHorizontal: 20,
  },
  zoneCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoneInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  zoneIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  zoneDetails: {
    flex: 1,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  zoneAddress: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  zoneDevices: {
    fontSize: 12,
    color: "#999999",
  },
  chevron: {
    fontSize: 20,
    color: "#CCCCCC",
  },
  addZoneButton: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2C5282",
    borderStyle: "dashed",
  },
  addZoneButtonText: {
    color: "#2C5282",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

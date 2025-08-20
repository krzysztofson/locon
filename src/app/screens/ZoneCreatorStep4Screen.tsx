import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ZonesStackParamList } from "../navigation/types";

type ZoneCreatorStep4NavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZoneCreatorStep4"
>;
type ZoneCreatorStep4RouteProp = RouteProp<
  ZonesStackParamList,
  "ZoneCreatorStep4"
>;

interface Device {
  id: string;
  name: string;
  type: string;
  user: string;
  icon: string;
}

export const ZoneCreatorStep4Screen: React.FC = () => {
  const navigation = useNavigation<ZoneCreatorStep4NavigationProp>();
  const route = useRoute<ZoneCreatorStep4RouteProp>();
  const { name, icon, address, coordinates, radius } = route.params;

  // Mock devices data
  const devices: Device[] = [
    {
      id: "1",
      name: "Rodzinne SOS",
      type: "telefon",
      user: "Anna - córka",
      icon: "📱",
    },
    {
      id: "2",
      name: "GJD.13",
      type: "zegarek",
      user: "Tomek - syn",
      icon: "⌚",
    },
    {
      id: "3",
      name: "BS.07",
      type: "opaska",
      user: "Babcia - senior",
      icon: "📿",
    },
  ];

  const [notifications, setNotifications] = useState<{
    [key: string]: boolean;
  }>({
    "1": true,
    "2": false,
    "3": true,
  });

  const handleNotificationToggle = (deviceId: string) => {
    setNotifications((prev) => ({
      ...prev,
      [deviceId]: !prev[deviceId],
    }));
  };

  const handleSave = () => {
    // In a real app, we would save the zone here
    console.log("Saving zone:", {
      name,
      icon,
      address,
      coordinates,
      radius,
      notifications,
    });

    navigation.navigate("ZoneCreatorSuccess");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.stepText}>Krok 4 z 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "100%" }]} />
        </View>

        <Text style={styles.title}>Wybierz urządzenia</Text>

        <Text style={styles.subtitle}>
          Dla których urządzeń chcesz otrzymywać powiadomienia o wejściu i
          wyjściu ze strefy?
        </Text>

        <View style={styles.devicesList}>
          {devices.map((device) => (
            <View key={device.id} style={styles.deviceCard}>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceIcon}>{device.icon}</Text>
                <View style={styles.deviceDetails}>
                  <Text style={styles.deviceName}>
                    {device.name} ({device.type})
                  </Text>
                  <Text style={styles.deviceUser}>{device.user}</Text>
                </View>
              </View>
              <View style={styles.notificationToggle}>
                <Text style={styles.toggleLabel}>Włącz powiadomienia</Text>
                <Switch
                  value={notifications[device.id]}
                  onValueChange={() => handleNotificationToggle(device.id)}
                  trackColor={{ false: "#E5E5E5", true: "#50C878" }}
                  thumbColor={notifications[device.id] ? "#FFFFFF" : "#FFFFFF"}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.hint}>
          <Text style={styles.hintIcon}>💡</Text>
          <Text style={styles.hintText}>
            Wskazówka: Gdy włączysz powiadomienia, będziesz otrzymywać alerty
            zarówno o wejściu, jak i wyjściu urządzenia ze strefy.
          </Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Zapisz</Text>
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 22,
    marginBottom: 30,
  },
  devicesList: {
    marginBottom: 30,
  },
  deviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  deviceIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  deviceUser: {
    fontSize: 14,
    color: "#666666",
  },
  notificationToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleLabel: {
    fontSize: 14,
    color: "#333333",
  },
  hint: {
    flexDirection: "row",
    backgroundColor: "#E6F3FF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  hintIcon: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  hintText: {
    flex: 1,
    fontSize: 14,
    color: "#2C5282",
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

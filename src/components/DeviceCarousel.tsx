import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Device } from "../types";

interface DeviceCarouselProps {
  devices: Device[];
  selectedDeviceId: string | null;
  onDeviceSelect: (deviceId: string) => void;
}

export const DeviceCarousel: React.FC<DeviceCarouselProps> = ({
  devices,
  selectedDeviceId,
  onDeviceSelect,
}) => {
  const getDeviceIcon = (type: Device["type"]) => {
    switch (type) {
      case "phone":
        return "📱";
      case "watch":
        return "⌚";
      case "tracker":
        return "📍";
      default:
        return "📱";
    }
  };

  const getStatusColor = (status: Device["status"]) => {
    return status === "online" ? "#4CAF50" : "#9E9E9E";
  };

  if (devices.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Brak urządzeń</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {devices.map((device) => (
          <TouchableOpacity
            key={device.id}
            style={[
              styles.deviceCard,
              selectedDeviceId === device.id && styles.selectedCard,
            ]}
            onPress={() => onDeviceSelect(device.id)}
          >
            <View style={styles.deviceHeader}>
              <Text style={styles.deviceIcon}>
                {getDeviceIcon(device.type)}
              </Text>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(device.status) },
                ]}
              />
            </View>
            <Text style={styles.deviceName} numberOfLines={1}>
              {device.name}
            </Text>
            <Text style={styles.ownerName} numberOfLines={1}>
              {device.owner.name}
            </Text>
            {device.batteryLevel !== undefined && (
              <Text style={styles.batteryLevel}>🔋 {device.batteryLevel}%</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  deviceCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 12,
    minWidth: 100,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3",
  },
  deviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  deviceIcon: {
    fontSize: 24,
    marginRight: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  deviceName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 2,
  },
  ownerName: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    marginBottom: 4,
  },
  batteryLevel: {
    fontSize: 10,
    color: "#888",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
});

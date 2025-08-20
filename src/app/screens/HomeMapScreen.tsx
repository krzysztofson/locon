import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert, Platform, Text } from "react-native";
import MapView, { Marker, Circle } from "../../components/PlatformMap";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import {
  selectDevice,
  fetchDevicesSuccess,
} from "../../state/slices/devicesSlice";
import { DeviceCarousel } from "../../components/DeviceCarousel";
import { ZoneBottomSheet } from "../../components/ZoneBottomSheet";
import { FloatingActionButtons } from "../../components/FloatingActionButtons";
import { Device, Zone } from "../../types";
import { MOCK_DEVICES, MOCK_ZONES } from "../../data";

// Define Region interface for cross-platform compatibility
interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const HomeMapScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const mapRef = useRef<any>(null);

  // State
  const [zones] = useState<Zone[]>(MOCK_ZONES);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isZoneSheetVisible, setIsZoneSheetVisible] = useState(false);

  // Redux state
  const { devices, selectedDeviceId, isLoading } = useSelector(
    (state: RootState) => state.devices
  );

  // Initialize mock data
  useEffect(() => {
    dispatch(fetchDevicesSuccess(MOCK_DEVICES));
  }, [dispatch]);

  const selectedDevice =
    devices.find((device) => device.id === selectedDeviceId) || devices[0];

  // Initial region based on selected device or default to Warsaw
  const getInitialRegion = (): Region => {
    if (selectedDevice?.lastLocation) {
      return {
        latitude: selectedDevice.lastLocation.lat,
        longitude: selectedDevice.lastLocation.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }

    return {
      latitude: 52.2297,
      longitude: 21.0122,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  };

  const [region, setRegion] = useState<Region>(getInitialRegion());

  // Center map on selected device
  useEffect(() => {
    if (selectedDevice?.lastLocation && mapRef.current) {
      const newRegion = {
        latitude: selectedDevice.lastLocation.lat,
        longitude: selectedDevice.lastLocation.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      mapRef.current.animateToRegion(newRegion, 1000);
      setRegion(newRegion);
    }
  }, [selectedDevice]);

  const handleDeviceSelect = (deviceId: string) => {
    dispatch(selectDevice(deviceId));
  };

  const handleMarkerPress = (device: Device) => {
    handleDeviceSelect(device.id);

    if (device.lastLocation && mapRef.current) {
      const newRegion = {
        latitude: device.lastLocation.lat,
        longitude: device.lastLocation.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  const handleZonePress = (zone: Zone) => {
    setSelectedZone(zone);
    setIsZoneSheetVisible(true);
  };

  const handleEditZone = (zone: Zone) => {
    // @ts-ignore - Navigation types will be properly typed later
    navigation.navigate("ZoneEdit", { zoneId: zone.id });
  };

  const handleToggleZoneNotifications = (zone: Zone) => {
    // Implementation for toggling notifications
    Alert.alert(
      "Powiadomienia",
      `Powiadomienia dla strefy "${zone.name}" zostały ${
        Object.values(zone.notificationsByDevice).some((enabled) => enabled)
          ? "wyłączone"
          : "włączone"
      }.`
    );
  };

  const handleDeleteZone = (zone: Zone) => {
    Alert.alert(
      "Usuń strefę",
      `Czy na pewno chcesz usunąć strefę "${zone.name}"?`,
      [
        { text: "Anuluj", style: "cancel" },
        {
          text: "Usuń",
          style: "destructive",
          onPress: () => {
            // Implementation for deleting zone
            Alert.alert("Usunięto", `Strefa "${zone.name}" została usunięta.`);
          },
        },
      ]
    );
  };

  const handleAddZone = () => {
    // @ts-ignore - Navigation types will be properly typed later
    navigation.navigate("ZoneCreatorStep1");
  };

  const handleZonesList = () => {
    // @ts-ignore - Navigation types will be properly typed later
    navigation.navigate("ZonesList");
  };

  const handleSettings = () => {
    // @ts-ignore - Navigation types will be properly typed later
    navigation.navigate("Settings");
  };

  const getDeviceMarkerIcon = (device: Device) => {
    return device.owner.avatar || "👤";
  };

  // Basic guard so we always render something
  if (!selectedDevice) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <Text>Ładowanie danych urządzeń...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DeviceCarousel
        devices={devices}
        selectedDeviceId={selectedDeviceId}
        onDeviceSelect={handleDeviceSelect}
      />

      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="standard"
        initialRegion={region}
        showsUserLocation={Platform.OS !== "web"}
        showsMyLocationButton={false}
        onRegionChangeComplete={setRegion}
      >
        {/* Device markers */}
        {devices
          .filter((device) => device.lastLocation && device.isActive)
          .map((device) => (
            <Marker
              key={device.id}
              coordinate={{
                latitude: device.lastLocation!.lat,
                longitude: device.lastLocation!.lon,
              }}
              title={device.name}
              description={`${device.owner.name} • ${device.status}`}
              onPress={() => handleMarkerPress(device)}
            >
              <View
                style={[
                  styles.deviceMarker,
                  selectedDeviceId === device.id && styles.selectedDeviceMarker,
                ]}
              >
                <Text style={styles.deviceMarkerText}>
                  {getDeviceMarkerIcon(device)}
                </Text>
              </View>
            </Marker>
          ))}

        {/* Zone circles */}
        {zones
          .filter((zone) => zone.active)
          .map((zone) => (
            <Circle
              key={zone.id}
              center={{
                latitude: zone.center.lat,
                longitude: zone.center.lon,
              }}
              radius={zone.radius}
              fillColor={`${zone.color || "#2196F3"}20`}
              strokeColor={zone.color || "#2196F3"}
              strokeWidth={2}
            />
          ))}

        {/* Zone center markers */}
        {zones
          .filter((zone) => zone.active)
          .map((zone) => (
            <Marker
              key={`${zone.id}-center`}
              coordinate={{
                latitude: zone.center.lat,
                longitude: zone.center.lon,
              }}
              title={zone.name}
              description={`Promień: ${zone.radius}m`}
              onPress={() => handleZonePress(zone)}
            >
              <View style={styles.zoneMarker}>
                <Text style={styles.zoneMarkerText}>{zone.icon}</Text>
              </View>
            </Marker>
          ))}
      </MapView>

      <FloatingActionButtons
        onAddZone={handleAddZone}
        onZonesList={handleZonesList}
        onSettings={handleSettings}
      />

      <ZoneBottomSheet
        zone={selectedZone}
        isVisible={isZoneSheetVisible}
        onClose={() => setIsZoneSheetVisible(false)}
        onEdit={handleEditZone}
        onToggleNotifications={handleToggleZoneNotifications}
        onDelete={handleDeleteZone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  deviceMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#2196F3",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedDeviceMarker: {
    borderColor: "#FF4081",
    borderWidth: 4,
  },
  deviceMarkerText: {
    fontSize: 20,
  },
  zoneMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  zoneMarkerText: {
    fontSize: 16,
  },
});

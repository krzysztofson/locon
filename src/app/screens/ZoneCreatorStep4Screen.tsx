import React, { useState, useEffect } from "react";
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
import { useZoneCreatorStore } from "../../state/zoneCreatorStore";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { createZoneAsync } from "../../state/slices/zonesThunks";
import { addZone, removeZone } from "../../state/slices/zonesSlice";
import { useToast } from "../contexts/ToastContext";
import { useT } from "../../i18n/I18nextProvider";

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
  const { zoneDraft, setNotifications, reset } = useZoneCreatorStore();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const devicesFromStore = useAppSelector((s) => s.devices.devices);
  const { t } = useT();

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

  const [saving, setSaving] = useState(false);
  useEffect(() => {
    // initialize notifications if empty
    if (
      devicesFromStore.length &&
      Object.keys(zoneDraft.notificationsByDevice).length === 0
    ) {
      devicesFromStore.forEach((d) => setNotifications(d.id, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devicesFromStore]);

  const handleNotificationToggle = (deviceId: string) => {
    const current = zoneDraft.notificationsByDevice[deviceId];
    setNotifications(deviceId, !current);
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    // optimistic object
    const optimisticId = `tmp_${Date.now()}`;
    const base = {
      id: optimisticId,
      name,
      description: `${t("zones.descriptionPrefix")} ${name}`,
      type: "other" as const,
      coordinates: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        radius,
      },
      address,
      isActive: true,
      notifications: {
        onEntry: true,
        onExit: true,
        sound: true,
        vibration: true,
      },
      devices: Object.keys(zoneDraft.notificationsByDevice).filter(
        (k) => zoneDraft.notificationsByDevice[k]
      ),
      schedule: {
        enabled: false,
        activeHours: { start: "00:00", end: "23:59" },
        activeDays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "user1",
      color: "#4CAF50",
    };
    dispatch(addZone(base as any));
    try {
      const created = await dispatch(
        createZoneAsync({
          name: base.name,
          description: base.description,
          type: base.type,
          coordinates: base.coordinates,
          address: base.address,
          isActive: base.isActive,
          notifications: base.notifications,
          devices: base.devices,
          notificationsByDevice: { ...zoneDraft.notificationsByDevice },
          schedule: base.schedule,
          color: base.color,
        } as any)
      ).unwrap();
      // remove optimistic (will remain final created via fulfilled push) => optional cleanup
      dispatch(removeZone(optimisticId));
      showToast(t("zones.create.success"), "success");
      navigation.navigate("ZoneCreatorSuccess");
      reset();
    } catch (e) {
      dispatch(removeZone(optimisticId));
      showToast(t("zones.create.error"), "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.stepText}>{t("wizard.step4of4")}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "100%" }]} />
        </View>

        <Text style={styles.title}>{t("wizard.devicesTitle")}</Text>

        <Text style={styles.subtitle}>{t("wizard.devicesSubtitle")}</Text>

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
                <Text style={styles.toggleLabel}>
                  {t("wizard.toggleNotifications")}
                </Text>
                <Switch
                  value={zoneDraft.notificationsByDevice[device.id] ?? true}
                  onValueChange={() => handleNotificationToggle(device.id)}
                  trackColor={{ false: "#E5E5E5", true: "#50C878" }}
                  thumbColor={
                    zoneDraft.notificationsByDevice[device.id] ?? true
                      ? "#FFFFFF"
                      : "#FFFFFF"
                  }
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.hint}>
          <Text style={styles.hintIcon}>💡</Text>
          <Text style={styles.hintText}>{t("wizard.hintNotifications")}</Text>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? t("status.saving") : t("common.save")}
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

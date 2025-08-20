import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ZonesStackParamList } from "../navigation/types";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { refreshZones, removeZone } from "../../state/slices/zonesSlice";
import {
  fetchZonesAsync,
  toggleZoneActiveAsync,
  deleteZoneAsync,
} from "../../state/slices/zonesThunks";
import { Zone } from "../../modules/zones/types";
import { MOCK_DEVICES } from "../../data/mockData";
import { fetchDevicesSuccess } from "../../state/slices/devicesSlice";
import { Text } from "../../components/themed/Text";
import { Button } from "../../components/themed/Button";
import { Card } from "../../components/themed/Card";
import { Switch } from "../../components/themed/Switch";
import { Modal } from "../../components/themed/Modal";
import { IconButton } from "../../components/themed/IconButton";
import { useToast } from "../contexts/ToastContext";

type ZonesListNavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZonesList"
>;

interface ZoneCardProps {
  zone: Zone;
  onToggleActive: (zoneId: string) => void;
  onEdit: (zoneId: string) => void;
  onDelete: (zoneId: string) => void;
  onPress: (zoneId: string) => void;
  devices: any[];
  totalDevices: number;
  notificationsByDevice: Record<string, boolean>;
}

const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  onToggleActive,
  onEdit,
  onDelete,
  onPress,
  devices,
  totalDevices,
  notificationsByDevice,
}) => {
  const [showActionsModal, setShowActionsModal] = useState(false);
  const isPending = zone.id.startsWith("tmp_");

  const getZoneIcon = (type?: string) => {
    switch (type) {
      case "home":
        return "🏠";
      case "school":
        return "🏫";
      case "work":
        return "🏢";
      default:
        return "📍";
    }
  };

  const getDevicesWithNotifications = () => {
    const activeDevices = devices.filter((d) => d.isActive);
    const enabled = activeDevices.filter(
      (d) => notificationsByDevice[d.id] !== false
    ).length; // default true
    return `${enabled}/${totalDevices}`;
  };

  const handleToggleActive = () => {
    onToggleActive(zone.id);
  };

  const handleMorePress = () => {
    setShowActionsModal(true);
  };

  const handleEdit = () => {
    setShowActionsModal(false);
    onEdit(zone.id);
  };

  const handleDelete = () => {
    setShowActionsModal(false);
    if (Platform.OS === "web") {
      // Alert on web can be inconsistent; delete immediately
      onDelete(zone.id);
      return;
    }
    Alert.alert(
      "Usuń strefę",
      `Czy na pewno chcesz usunąć strefę "${zone.name}"?`,
      [
        { text: "Anuluj", style: "cancel" },
        {
          text: "Usuń",
          style: "destructive",
          onPress: () => onDelete(zone.id),
        },
      ]
    );
  };

  return (
    <>
      <Card
        style={
          [styles.zoneCard as any, isPending && styles.zoneCardPending] as any
        }
      >
        <TouchableOpacity
          style={styles.zoneCardContent}
          onPress={() => onPress(zone.id)}
          activeOpacity={0.7}
        >
          <View style={styles.zoneInfo}>
            <View style={styles.zoneIconContainer}>
              <Text style={styles.zoneIcon}>{getZoneIcon(zone.type)}</Text>
            </View>

            <View style={styles.zoneDetails}>
              <Text variant="h4" style={styles.zoneName}>
                {zone.name}
              </Text>
              <Text variant="caption" style={styles.zoneRadius}>
                Promień: {zone.coordinates?.radius || 100}m
              </Text>
              <Text variant="caption" style={styles.zoneDevices}>
                Powiadomienia: {getDevicesWithNotifications()}
              </Text>
              {isPending && (
                <Text variant="caption" style={styles.pendingText}>
                  Zapisywanie...
                </Text>
              )}
            </View>

            <View style={styles.zoneActions}>
              <View style={styles.switchContainer}>
                <Switch
                  value={zone.isActive}
                  onValueChange={handleToggleActive}
                  size="sm"
                />
              </View>
              <IconButton
                icon={<Text style={{ fontSize: 18 }}>⋯</Text>}
                onPress={handleMorePress}
                size="sm"
                variant="ghost"
              />
            </View>
          </View>
        </TouchableOpacity>
      </Card>

      <Modal
        visible={showActionsModal}
        onClose={() => setShowActionsModal(false)}
        title="Akcje strefy"
        size="sm"
        showCloseButton
  showFooter
        footerActions={[
          {
            label: "Edytuj",
            onPress: handleEdit,
            variant: "primary",
          },
          {
            label: "Usuń",
            onPress: handleDelete,
            variant: "error",
          },
        ]}
      >
        <Text>Wybierz akcję dla strefy "{zone.name}"</Text>
      </Modal>
    </>
  );
};

const EmptyState: React.FC<{ onAddZone: () => void }> = ({ onAddZone }) => (
  <View style={styles.emptyState}>
    <View style={styles.emptyIconContainer}>
      <Text style={styles.emptyIcon}>📍</Text>
    </View>

    <Text variant="h3" style={styles.emptyTitle}>
      Brak stref bezpieczeństwa
    </Text>

    <Text variant="body" style={styles.emptySubtitle}>
      Ustaw pierwszą strefę aby otrzymywać powiadomienia gdy Twoi bliscy wejdą
      lub wyjdą z ważnych miejsc
    </Text>

    <View style={styles.featureList}>
      <View style={styles.feature}>
        <Text style={styles.featureIcon}>📱</Text>
        <Text style={styles.featureText}>
          Otrzymuj automatyczne powiadomienia
        </Text>
      </View>

      <View style={styles.feature}>
        <Text style={styles.featureIcon}>📍</Text>
        <Text style={styles.featureText}>
          Ustaw strefy wokół domu, szkoły, pracy
        </Text>
      </View>

      <View style={styles.feature}>
        <Text style={styles.featureIcon}>🛡</Text>
        <Text style={styles.featureText}>
          Bądź spokojny o bezpieczeństwo bliskich
        </Text>
      </View>
    </View>

    <Button
      title="Dodaj pierwszą strefę"
      onPress={onAddZone}
      variant="primary"
      style={styles.addFirstZoneButton}
    />
  </View>
);

export const ZonesListScreen: React.FC = () => {
  const navigation = useNavigation<ZonesListNavigationProp>();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const { zones, isLoading, error } = useAppSelector((state) => state.zones);
  const { devices } = useAppSelector((state) => state.devices);
  const totalDevices = devices.length || 0;

  const PAGE_SIZE = 20;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [refreshing, setRefreshing] = useState(false);

  console.log(
    "ZonesListScreen: Rendering, zones:",
    zones.length,
    "isLoading:",
    isLoading
  );

  useEffect(() => {
    console.log("ZonesListScreen: useEffect triggered, loading data");
    // Load initial data using async thunk
    dispatch(fetchZonesAsync());
    dispatch(fetchDevicesSuccess(MOCK_DEVICES));
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchZonesAsync()).unwrap();
      showToast("Odświeżono strefy", "success");
    } catch (error) {
      console.error("Failed to refresh zones:", error);
      showToast("Nie udało się odświeżyć stref", "error");
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const handleAddZone = () => {
    navigation.navigate("ZoneCreatorStep1");
  };

  const handleZonePress = (zoneId: string) => {
    navigation.navigate("ZoneEdit", { zoneId });
  };

  const handleToggleZoneActive = async (zoneId: string) => {
    // optimistic
    const prev = zones.find((z) => z.id === zoneId)?.isActive;
    dispatch({ type: "zones/toggleZoneActive", payload: zoneId });
    try {
      await dispatch(toggleZoneActiveAsync(zoneId)).unwrap();
      showToast("Zmieniono status strefy", "success");
    } catch (error) {
      // rollback
      if (prev !== undefined) {
        dispatch({ type: "zones/toggleZoneActive", payload: zoneId });
      }
      console.error("Failed to toggle zone active:", error);
      showToast("Nie udało się zmienić stanu strefy", "error");
    }
  };

  const handleEditZone = (zoneId: string) => {
    navigation.navigate("ZoneEdit", { zoneId });
  };

  const handleDeleteZone = async (zoneId: string) => {
    // Jeśli to strefa tymczasowa (optymistyczna), usuń lokalnie
    if (zoneId.startsWith("tmp_")) {
      dispatch(removeZone(zoneId));
      showToast("Anulowano tworzenie strefy", "info");
      return;
    }
    try {
      await dispatch(deleteZoneAsync(zoneId)).unwrap();
      showToast("Usunięto strefę", "success");
    } catch (error) {
      console.error("Failed to delete zone:", error);
      showToast("Nie udało się usunąć strefy", "error");
    }
  };

  const renderZoneItem = ({ item }: { item: Zone }) => {
    const perZoneNotifications = item.notificationsByDevice || {};
    return (
      <ZoneCard
        zone={item}
        onToggleActive={handleToggleZoneActive}
        onEdit={handleEditZone}
        onDelete={handleDeleteZone}
        onPress={handleZonePress}
        devices={devices}
        totalDevices={totalDevices}
        notificationsByDevice={perZoneNotifications}
      />
    );
  };

  const renderEmptyComponent = () => <EmptyState onAddZone={handleAddZone} />;

  const renderHeader = () => {
    if (zones.length === 0) return null;

    return (
      <View style={styles.header}>
        <Text variant="body" style={styles.subtitle}>
          Ustaw strefę i otrzymuj powiadomienia gdy Bliski się w niej pojawi lub
          ją opuści.
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (zones.length === 0) return null;

    return (
      <Button
        title="+ Dodaj strefę"
        onPress={handleAddZone}
        variant="outline"
        style={styles.addZoneButton}
      />
    );
  };

  if (isLoading && zones.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Ładowanie stref...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={zones.slice(0, visibleCount)}
      renderItem={renderZoneItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyComponent}
      // Footer handled dynamically below
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          title="Odśwież strefy"
        />
      }
      contentContainerStyle={
        zones.length === 0 ? styles.emptyContainer : styles.listContainer
      }
      showsVerticalScrollIndicator={false}
      // Lazy loading - in real app would implement pagination
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        if (visibleCount < zones.length) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, zones.length));
        }
      }}
      ListFooterComponent={
        zones.length > visibleCount ? (
          <View style={{ padding: 16 }}>
            <ActivityIndicator />
          </View>
        ) : (
          renderFooter()
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  listContainer: {
    paddingVertical: 16,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  // Zone Card Styles
  zoneCard: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  zoneCardPending: {
    opacity: 0.6,
  },
  zoneCardContent: {
    padding: 16,
  },
  zoneInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  zoneIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  zoneIcon: {
    fontSize: 24,
  },
  zoneDetails: {
    flex: 1,
    marginRight: 16,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 24,
  },
  zoneRadius: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
  },
  zoneDevices: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 12,
  },
  pendingText: {
    fontSize: 12,
    color: "#2C5282",
    marginTop: 2,
  },
  zoneActions: {
    alignItems: "center",
    gap: 8,
  },
  switchContainer: {
    marginBottom: 4,
  },
  // Empty State Styles
  emptyState: {
    padding: 32,
    alignItems: "center",
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  featureList: {
    width: "100%",
    marginBottom: 32,
  },
  feature: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: "#666666",
    lineHeight: 22,
  },
  addFirstZoneButton: {
    width: "100%",
    marginTop: 8,
  },
  addZoneButton: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

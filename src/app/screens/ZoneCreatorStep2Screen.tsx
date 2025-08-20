import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ZonesStackParamList } from "../navigation/types";
import {
  geocodingService,
  GeocodeResult,
} from "../../services/geocodingService";
import { useZoneCreatorStore } from "../../state/zoneCreatorStore";
import MapView, { Marker } from "../../components/PlatformMap";
import { Platform } from "react-native";
import { useT } from "../../i18n/I18nextProvider";

type ZoneCreatorStep2NavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZoneCreatorStep2"
>;
type ZoneCreatorStep2RouteProp = RouteProp<
  ZonesStackParamList,
  "ZoneCreatorStep2"
>;

export const ZoneCreatorStep2Screen: React.FC = () => {
  const { t } = useT();
  const navigation = useNavigation<ZoneCreatorStep2NavigationProp>();
  const route = useRoute<ZoneCreatorStep2RouteProp>();
  const { name, icon } = route.params;
  const { zoneDraft, setCenter } = useZoneCreatorStore();
  const [address, setAddress] = useState(
    zoneDraft.center
      ? zoneDraft.center.lat.toFixed(4) + "," + zoneDraft.center.lng.toFixed(4)
      : ""
  );
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: zoneDraft.center?.lat || 52.2297,
    longitude: zoneDraft.center?.lng || 21.0122,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  // fetch suggestions debounce
  useEffect(() => {
    let active = true;
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    geocodingService.autocomplete(query).then((res) => {
      if (active) {
        setSuggestions(res);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [query]);

  const selectSuggestion = (item: GeocodeResult) => {
    setQuery(item.address);
    setSuggestions([]);
    setCenter({ lat: item.lat, lng: item.lng });
    setMapRegion((r) => ({ ...r, latitude: item.lat, longitude: item.lng }));
  };

  const handleDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCenter({ lat: latitude, lng: longitude });
    geocodingService
      .reverse(latitude, longitude)
      .then((r) => setQuery(r.address));
  };

  const useMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords as any;
          setCenter({ lat: latitude, lng: longitude });
          setMapRegion((r) => ({ ...r, latitude, longitude }));
          geocodingService
            .reverse(latitude, longitude)
            .then((r) => setQuery(r.address));
        },
        () => {
          // fallback
          setCenter({ lat: 52.2297, lng: 21.0122 });
        }
      );
    } else {
      setCenter({ lat: 52.2297, lng: 21.0122 });
    }
  };

  const handleNext = () => {
    if (zoneDraft.center) {
      navigation.navigate("ZoneCreatorStep3", {
        name,
        icon,
        address: query || "Nieznany adres",
        coordinates: { lat: zoneDraft.center.lat, lng: zoneDraft.center.lng },
      });
    }
  };

  const canContinue = !!zoneDraft.center;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.stepText}>{t("wizard.step2of4")}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "50%" }]} />
        </View>

        <Text style={styles.title}>{t("wizard.locationTitle")}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("wizard.addressPlaceholder", {
              defaultValue: "Wpisz adres lub miejsce",
            })}
            value={query}
            onChangeText={setQuery}
            placeholderTextColor="#999999"
          />
          {loading && (
            <Text style={styles.loadingText}>{t("wizard.searching")}</Text>
          )}
          {suggestions.length > 0 && (
            <View style={styles.suggestionsBox}>
              {suggestions.map((s) => (
                <TouchableOpacity
                  key={s.address}
                  style={styles.suggestionItem}
                  onPress={() => selectSuggestion(s)}
                >
                  <Text style={styles.suggestionText}>{s.address}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.mapContainer}>
          <View style={styles.mapWrapper}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={mapRegion}
              region={mapRegion}
              onRegionChangeComplete={(r: any) => setMapRegion(r)}
            >
              {zoneDraft.center && (
                <Marker
                  coordinate={{
                    latitude: zoneDraft.center.lat,
                    longitude: zoneDraft.center.lng,
                  }}
                  draggable
                  onDragEnd={handleDragEnd}
                />
              )}
            </MapView>
            {!zoneDraft.center && (
              <View style={styles.centerOverlay}>
                <Text style={styles.centerHint}>{t("wizard.centerHint")}</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.hint}>{t("wizard.addressHint")}</Text>

        <TouchableOpacity style={styles.geoButton} onPress={useMyLocation}>
          <Text style={styles.geoButtonText}>{t("wizard.useMyLocation")}</Text>
        </TouchableOpacity>

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
            {t("common.next")}
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
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  loadingText: { fontSize: 12, color: "#666", marginTop: 4 },
  suggestionsBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    marginTop: 6,
    overflow: "hidden",
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  suggestionText: { fontSize: 14, color: "#2D3748" },
  mapWrapper: {
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#E5E5E5",
  },
  centerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  },
  centerHint: {
    backgroundColor: "rgba(0,0,0,0.55)",
    color: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 12,
  },
  geoButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 25,
  },
  geoButtonText: { color: "#FFF", textAlign: "center", fontWeight: "600" },
  mapContainer: {
    marginBottom: 20,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 10,
  },
  mapIcon: {
    fontSize: 30,
  },
  hint: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 15,
    borderRadius: 8,
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

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ZonesStackParamList } from "../navigation/types";
import { useZoneCreatorStore } from "../../state/zoneCreatorStore";
import { useT } from "../../i18n/I18nextProvider";
import MapView, { Circle, Marker } from "../../components/PlatformMap";

type ZoneCreatorStep3NavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZoneCreatorStep3"
>;
type ZoneCreatorStep3RouteProp = RouteProp<
  ZonesStackParamList,
  "ZoneCreatorStep3"
>;

export const ZoneCreatorStep3Screen: React.FC = () => {
  const navigation = useNavigation<ZoneCreatorStep3NavigationProp>();
  const route = useRoute<ZoneCreatorStep3RouteProp>();
  const { name, icon, address, coordinates } = route.params;
  const { zoneDraft, setRadius } = useZoneCreatorStore();
  const { t } = useT();
  const [radius, internalSetRadius] = useState(zoneDraft.radius || 250);
  useEffect(() => {
    setRadius(radius);
  }, [radius, setRadius]);
  const minRadius = 100;
  const maxRadius = 5000;

  const handleNext = () => {
    navigation.navigate("ZoneCreatorStep4", {
      name,
      icon,
      address,
      coordinates,
      radius,
    });
  };

  const adjustRadius = (newRadius: number) => {
    const clampedRadius = Math.max(minRadius, Math.min(maxRadius, newRadius));
    internalSetRadius(clampedRadius);
  };

  const radiusPercentage =
    ((radius - minRadius) / (maxRadius - minRadius)) * 100;

  const trackRef = useRef<View | null>(null);

  const handleTrackPress = (evt: any) => {
    if (!trackRef.current) return;
    trackRef.current.measure((_x, _y, width, _h, pageX) => {
      const clickX = evt.nativeEvent.pageX - pageX;
      const ratio = Math.max(0, Math.min(1, clickX / width));
      const newRadius = Math.round(minRadius + ratio * (maxRadius - minRadius));
      adjustRadius(newRadius);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.stepText}>{t("wizard.step3of4")}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "75%" }]} />
        </View>

        <Text style={styles.title}>{t("wizard.areaTitle")}</Text>

        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <MapView
              style={{ flex: 1, alignSelf: "stretch" }}
              initialRegion={{
                latitude: coordinates.lat,
                longitude: coordinates.lng,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              <Marker
                coordinate={{
                  latitude: coordinates.lat,
                  longitude: coordinates.lng,
                }}
              />
              <Circle
                center={{
                  latitude: coordinates.lat,
                  longitude: coordinates.lng,
                }}
                radius={radius}
                strokeColor="#2C5282"
                fillColor="rgba(44,82,130,0.15)"
              />
            </MapView>
            <View style={styles.radiusOverlay}>
              <Text style={styles.radiusOverlayText}>{radius} m</Text>
            </View>
          </View>
        </View>

        <Text style={styles.radiusLabel}>{t("wizard.radiusLabel")}</Text>
        <Text style={styles.radiusValue}>{radius} m</Text>

        <View style={styles.sliderContainer}>
          <View
            ref={trackRef}
            onStartShouldSetResponder={() => true}
            onResponderGrant={handleTrackPress}
            onResponderMove={handleTrackPress}
            style={styles.sliderTrack}
            accessibilityRole="adjustable"
            accessibilityLabel={t("wizard.radiusAccessibilityLabel")}
            accessibilityValue={{ text: `${radius} m` }}
          >
            <View
              style={[styles.sliderFill, { width: `${radiusPercentage}%` }]}
            />
            <View
              style={[styles.sliderThumb, { left: `${radiusPercentage}%` }]}
            />
          </View>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{minRadius}m</Text>
            <Text style={styles.sliderLabel}>{maxRadius}m</Text>
          </View>
        </View>

        <View style={styles.radiusControls}>
          <TouchableOpacity
            style={[
              styles.radiusButton,
              radius <= minRadius && styles.radiusButtonDisabled,
            ]}
            onPress={() => adjustRadius(radius - 50)}
            disabled={radius <= minRadius}
          >
            <Text style={styles.radiusButtonText}>-50</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radiusButton,
              radius <= minRadius && styles.radiusButtonDisabled,
            ]}
            onPress={() => adjustRadius(radius - 10)}
            disabled={radius <= minRadius}
          >
            <Text style={styles.radiusButtonText}>-10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radiusButton,
              radius >= maxRadius && styles.radiusButtonDisabled,
            ]}
            onPress={() => adjustRadius(radius + 10)}
            disabled={radius >= maxRadius}
          >
            <Text style={styles.radiusButtonText}>+10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radiusButton,
              radius >= maxRadius && styles.radiusButtonDisabled,
            ]}
            onPress={() => adjustRadius(radius + 50)}
            disabled={radius >= maxRadius}
          >
            <Text style={styles.radiusButtonText}>+50</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>{t("wizard.radiusHint")}</Text>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{t("common.next")}</Text>
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
  mapContainer: {
    marginBottom: 30,
  },
  mapPlaceholder: {
    height: 220,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    overflow: "hidden",
  },
  mapText: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 10,
  },
  mapIcon: {
    fontSize: 30,
  },
  radiusOverlay: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  radiusOverlayText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
  radiusLabel: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
  radiusValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C5282",
    marginBottom: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    position: "relative",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#2C5282",
    borderRadius: 2,
  },
  sliderThumb: {
    position: "absolute",
    top: -8,
    width: 20,
    height: 20,
    backgroundColor: "#2C5282",
    borderRadius: 10,
    marginLeft: -10,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#666666",
  },
  radiusControls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  radiusButton: {
    minWidth: 54,
    paddingHorizontal: 10,
    height: 44,
    backgroundColor: "#2C5282",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  radiusButtonDisabled: { opacity: 0.4 },
  radiusButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  hint: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 40,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 15,
    borderRadius: 8,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

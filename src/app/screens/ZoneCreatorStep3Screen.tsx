import React, { useState } from "react";
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

  const [radius, setRadius] = useState(250);
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
    setRadius(clampedRadius);
  };

  const radiusPercentage =
    ((radius - minRadius) / (maxRadius - minRadius)) * 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.stepText}>Krok 3 z 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "75%" }]} />
        </View>

        <Text style={styles.title}>Ustal obszar strefy</Text>

        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>[PODGLĄD MAPY]</Text>
            <Text style={styles.mapIcon}>📍</Text>
            <View style={styles.radiusCircle}>
              <Text style={styles.radiusText}>{radius}m</Text>
            </View>
          </View>
        </View>

        <Text style={styles.radiusLabel}>Promień obszaru:</Text>
        <Text style={styles.radiusValue}>{radius} m</Text>

        <View style={styles.sliderContainer}>
          <View style={styles.sliderTrack}>
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
            style={styles.radiusButton}
            onPress={() => adjustRadius(radius - 50)}
            disabled={radius <= minRadius}
          >
            <Text style={styles.radiusButtonText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radiusButton}
            onPress={() => adjustRadius(radius + 50)}
            disabled={radius >= maxRadius}
          >
            <Text style={styles.radiusButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>
          Dostosuj wielkość obszaru gestem lub za pomocą przycisków plus i
          minus. Maksymalny promień strefy to 5000m.
        </Text>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Dalej</Text>
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
    height: 200,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mapText: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 10,
  },
  mapIcon: {
    fontSize: 30,
  },
  radiusCircle: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#2C5282",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  radiusText: {
    fontSize: 12,
    color: "#2C5282",
    fontWeight: "bold",
  },
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

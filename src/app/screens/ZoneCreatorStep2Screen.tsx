import React, { useState } from "react";
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

type ZoneCreatorStep2NavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZoneCreatorStep2"
>;
type ZoneCreatorStep2RouteProp = RouteProp<
  ZonesStackParamList,
  "ZoneCreatorStep2"
>;

export const ZoneCreatorStep2Screen: React.FC = () => {
  const navigation = useNavigation<ZoneCreatorStep2NavigationProp>();
  const route = useRoute<ZoneCreatorStep2RouteProp>();
  const { name, icon } = route.params;

  const [address, setAddress] = useState("");

  const handleNext = () => {
    if (address.trim()) {
      // In a real app, we would geocode the address here
      const mockCoordinates = { lat: 52.2297, lng: 21.0122 }; // Warsaw coordinates

      navigation.navigate("ZoneCreatorStep3", {
        name,
        icon,
        address: address.trim(),
        coordinates: mockCoordinates,
      });
    }
  };

  const canContinue = address.trim().length > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.stepText}>Krok 2 z 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "50%" }]} />
        </View>

        <Text style={styles.title}>Określ lokalizację</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Wpisz adres"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>[MAPA GOOGLE]</Text>
            <Text style={styles.mapIcon}>📍</Text>
          </View>
        </View>

        <Text style={styles.hint}>
          Przesuń znacznik na mapie lub wpisz dokładny adres
        </Text>

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
            Dalej
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

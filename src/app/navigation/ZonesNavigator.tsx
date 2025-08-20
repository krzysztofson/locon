import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ZonesStackParamList } from "./types";
import {
  ZonesListScreen,
  ZoneCreatorStep1Screen,
  ZoneCreatorStep2Screen,
  ZoneCreatorStep3Screen,
  ZoneCreatorStep4Screen,
  ZoneCreatorSuccessScreen,
  ZoneEditScreen,
} from "../screens";

const Stack = createNativeStackNavigator<ZonesStackParamList>();

export const ZonesNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#2C5282",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="ZonesList"
        component={ZonesListScreen}
        options={{ title: "Strefy" }}
      />
      <Stack.Screen
        name="ZoneCreatorStep1"
        component={ZoneCreatorStep1Screen}
        options={{ title: "Dodaj strefę" }}
      />
      <Stack.Screen
        name="ZoneCreatorStep2"
        component={ZoneCreatorStep2Screen}
        options={{ title: "Dodaj strefę" }}
      />
      <Stack.Screen
        name="ZoneCreatorStep3"
        component={ZoneCreatorStep3Screen}
        options={{ title: "Dodaj strefę" }}
      />
      <Stack.Screen
        name="ZoneCreatorStep4"
        component={ZoneCreatorStep4Screen}
        options={{ title: "Dodaj strefę" }}
      />
      <Stack.Screen
        name="ZoneCreatorSuccess"
        component={ZoneCreatorSuccessScreen}
        options={{ title: "Dodaj strefę" }}
      />
      <Stack.Screen
        name="ZoneEdit"
        component={ZoneEditScreen}
        options={{ title: "Edytuj strefę" }}
      />
    </Stack.Navigator>
  );
};

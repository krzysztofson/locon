import React from "react";
import { useT } from "../../i18n/I18nextProvider";
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
  const { t } = useT();
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
        options={{ title: t("zones.title") }}
      />
      <Stack.Screen
        name="ZoneCreatorStep1"
        component={ZoneCreatorStep1Screen}
        options={{ title: t("zones.createZone") }}
      />
      <Stack.Screen
        name="ZoneCreatorStep2"
        component={ZoneCreatorStep2Screen}
        options={{ title: t("zones.createZone") }}
      />
      <Stack.Screen
        name="ZoneCreatorStep3"
        component={ZoneCreatorStep3Screen}
        options={{ title: t("zones.createZone") }}
      />
      <Stack.Screen
        name="ZoneCreatorStep4"
        component={ZoneCreatorStep4Screen}
        options={{ title: t("zones.createZone") }}
      />
      <Stack.Screen
        name="ZoneCreatorSuccess"
        component={ZoneCreatorSuccessScreen}
        options={{ title: t("zones.createZone") }}
      />
      <Stack.Screen
        name="ZoneEdit"
        component={ZoneEditScreen}
        options={{ title: t("zones.editZone") }}
      />
    </Stack.Navigator>
  );
};

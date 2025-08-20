import React from "react";
import { useT } from "../../i18n/I18nextProvider";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "./types";
import { HomeScreen, SettingsScreen } from "../screens";
import { ZonesNavigator } from "./ZonesNavigator";
import { TestHomeScreen } from "../screens/TestHomeScreen";
import { TestZonesScreen } from "../screens/TestZonesScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const { t } = useT();
  console.log("MainTabNavigator: Rendering tab navigator");

  return (
    <Tab.Navigator
      sceneContainerStyle={{ flex: 1, backgroundColor: "#fff" }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
          borderTopWidth: 1,
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: "#2C5282",
        tabBarInactiveTintColor: "#A0AEC0",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: t("navigation.home", { defaultValue: t("zones.map") }),
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="🗺️" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ZonesTab"
        component={ZonesNavigator}
        options={{
          title: t("zones.title"),
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="🛡️" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: t("navigation.settings", {
            defaultValue: t("settings.support"),
          }),
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="⚙️" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

interface TabIconProps {
  icon: string;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, size }) => (
  <Text style={{ fontSize: size }}>{icon}</Text>
);

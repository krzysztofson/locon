import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "./types";
import { HomeScreen, SettingsScreen } from "../screens";
import { ZonesNavigator } from "./ZonesNavigator";
import { TestHomeScreen } from "../screens/TestHomeScreen";
import { TestZonesScreen } from "../screens/TestZonesScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  console.log("MainTabNavigator: Rendering tab navigator");

  return (
    <Tab.Navigator
      sceneContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
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
          title: "Mapa",
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="🗺️" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ZonesTab"
        component={ZonesNavigator}
        options={{
          title: "Strefy",
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="🛡️" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: "Ustawienia",
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

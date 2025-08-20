export type RootStackParamList = {
  // Auth Flow
  Auth: undefined;
  Login: undefined;
  Register: undefined;

  // Main App Flow
  MainTabs: undefined;
  Home: undefined; // Map screen

  // Zones Flow
  ZonesList: undefined;
  ZoneCreator: undefined;
  ZoneEdit: { zoneId: string };
  ZoneCreatorStep1: undefined;
  ZoneCreatorStep2: { name: string; icon: string };
  ZoneCreatorStep3: {
    name: string;
    icon: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  ZoneCreatorStep4: {
    name: string;
    icon: string;
    address: string;
    coordinates: { lat: number; lng: number };
    radius: number;
  };
  ZoneCreatorSuccess: undefined;

  // Settings
  Settings: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ZonesTab: undefined;
  SettingsTab: undefined;
};

export type ZonesStackParamList = {
  ZonesList: undefined;
  ZoneCreator: undefined;
  ZoneEdit: { zoneId: string };
  ZoneCreatorStep1: undefined;
  ZoneCreatorStep2: { name: string; icon: string };
  ZoneCreatorStep3: {
    name: string;
    icon: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  ZoneCreatorStep4: {
    name: string;
    icon: string;
    address: string;
    coordinates: { lat: number; lng: number };
    radius: number;
  };
  ZoneCreatorSuccess: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

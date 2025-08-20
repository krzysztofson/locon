export interface Zone {
  id: string;
  name: string;
  icon?: string;
  description: string;
  type: "home" | "school" | "work" | "other";
  coordinates: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  address: string;
  isActive: boolean;
  notifications: {
    onEntry: boolean;
    onExit: boolean;
    sound: boolean;
    vibration: boolean;
  };
  devices: string[];
  notificationsByDevice?: Record<string, boolean>; // mapping deviceId -> enabled
  schedule: {
    enabled: boolean;
    activeHours: {
      start: string;
      end: string;
    };
    activeDays: string[];
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  color: string;
}

export interface ZoneCreationData {
  name: string;
  icon?: string;
  description: string;
  type: "home" | "school" | "work" | "other";
  coordinates: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  address: string;
  isActive: boolean;
  notifications: {
    onEntry: boolean;
    onExit: boolean;
    sound: boolean;
    vibration: boolean;
  };
  devices: string[];
  notificationsByDevice?: Record<string, boolean>;
  schedule: {
    enabled: boolean;
    activeHours: {
      start: string;
      end: string;
    };
    activeDays: string[];
  };
  color: string;
}

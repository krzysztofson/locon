export interface Device {
  id: string;
  name: string;
  type: "phone" | "watch" | "tracker";
  lastLocation: {
    lat: number;
    lon: number;
    at: string;
  };
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  status: "online" | "offline" | "unknown";
  batteryLevel: number;
  isActive: boolean;
}

export interface Zone {
  id: string;
  name: string;
  icon: string;
  center: {
    lat: number;
    lon: number;
  };
  radius: number;
  notificationsByDevice: Record<string, boolean>;
  active: boolean;
  createdAt: string;
  color: string;
}

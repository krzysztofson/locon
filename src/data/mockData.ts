import { Device, Zone } from "../types";

export const MOCK_DEVICES: Device[] = [
  {
    id: "1",
    name: "iPhone Mamy",
    type: "phone",
    lastLocation: {
      lat: 52.2297,
      lon: 21.0122,
      at: new Date().toISOString(),
    },
    owner: {
      id: "user1",
      name: "Mama",
      avatar: "👩",
    },
    status: "online",
    batteryLevel: 85,
    isActive: true,
  },
  {
    id: "2",
    name: "Apple Watch Taty",
    type: "watch",
    lastLocation: {
      lat: 52.2307,
      lon: 21.0132,
      at: new Date().toISOString(),
    },
    owner: {
      id: "user2",
      name: "Tata",
      avatar: "👨",
    },
    status: "online",
    batteryLevel: 62,
    isActive: true,
  },
  {
    id: "3",
    name: "Tracker Dziecka",
    type: "tracker",
    lastLocation: {
      lat: 52.2287,
      lon: 21.0112,
      at: new Date().toISOString(),
    },
    owner: {
      id: "user3",
      name: "Ania",
      avatar: "👧",
    },
    status: "online",
    batteryLevel: 95,
    isActive: true,
  },
];

export const MOCK_ZONES: Zone[] = [
  {
    id: "zone1",
    name: "Dom",
    icon: "🏠",
    center: {
      lat: 52.2297,
      lon: 21.0122,
    },
    radius: 100,
    notificationsByDevice: {
      "1": true,
      "2": true,
      "3": true,
    },
    active: true,
    createdAt: new Date().toISOString(),
    color: "#4CAF50",
  },
  {
    id: "zone2",
    name: "Szkoła",
    icon: "🏫",
    center: {
      lat: 52.2317,
      lon: 21.0142,
    },
    radius: 150,
    notificationsByDevice: {
      "3": true,
    },
    active: true,
    createdAt: new Date().toISOString(),
    color: "#2196F3",
  },
];

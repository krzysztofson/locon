export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

// Zone types
export interface Zone {
  id: string;
  name: string;
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

// Device types
export interface Device {
  id: string;
  name: string;
  type: "phone" | "tracker";
  model: string;
  operator: string;
  phoneNumber: string;
  imei: string;
  status: "online" | "offline";
  batteryLevel: number;
  lastSeen: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: string;
  };
  owner: {
    id: string;
    name: string;
    role: "admin" | "user" | "viewer";
    avatar: string;
  };
  settings: {
    gpsEnabled: boolean;
    notificationsEnabled: boolean;
    emergencyMode: boolean;
    shareLocation: boolean;
    updateInterval?: number;
  };
  isActive: boolean;
  createdAt: string;
}

// User permissions
export interface UserPermissions {
  zones: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  devices: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  users: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  settings: {
    read: boolean;
    update: boolean;
  };
  notifications: {
    send: boolean;
    manage: boolean;
  };
}

// Theme types
export interface Theme {
  id: string;
  name: string;
  operator: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  logo: string | null;
}

// Internationalization types
export interface I18nData {
  language: string;
  name: string;
  flag: string;
  translations: {
    app: {
      name: string;
      tagline: string;
    };
    auth: {
      login: string;
      logout: string;
      phone: string;
      code: string;
      sendCode: string;
      verifyCode: string;
      invalidCode: string;
      phoneRequired: string;
    };
    navigation: {
      home: string;
      zones: string;
      settings: string;
    };
    zones: {
      title: string;
      empty: string;
      emptyDescription: string;
      create: string;
      edit: string;
      delete: string;
      name: string;
      description: string;
      address: string;
      radius: string;
      notifications: string;
      schedule: string;
      devices: string;
      save: string;
      cancel: string;
    };
    devices: {
      title: string;
      online: string;
      offline: string;
      battery: string;
      lastSeen: string;
      location: string;
    };
    common: {
      yes: string;
      no: string;
      ok: string;
      cancel: string;
      save: string;
      delete: string;
      edit: string;
      loading: string;
      error: string;
      success: string;
    };
  };
}

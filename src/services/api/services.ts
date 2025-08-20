import { apiClient } from "./client";
import { Zone, Device, UserPermissions, Theme, I18nData } from "./types";

// Zones API
export const zonesApi = {
  getAll: (): Promise<Zone[]> => {
    return apiClient.get<Zone[]>("/api/zones");
  },

  getById: (id: string): Promise<Zone> => {
    return apiClient.get<Zone>(`/api/zones/${id}`);
  },

  create: (
    zone: Omit<Zone, "id" | "createdAt" | "updatedAt" | "createdBy">
  ): Promise<Zone> => {
    return apiClient.post<Zone>("/api/zones", zone);
  },

  update: (id: string, zone: Partial<Zone>): Promise<Zone> => {
    return apiClient.put<Zone>(`/api/zones/${id}`, zone);
  },

  delete: (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`/api/zones/${id}`);
  },
};

// Devices API
export const devicesApi = {
  getAll: (): Promise<Device[]> => {
    return apiClient.get<Device[]>("/api/devices");
  },

  getById: (id: string): Promise<Device> => {
    return apiClient.get<Device>(`/api/devices/${id}`);
  },

  updateLocation: (
    id: string,
    location: { latitude: number; longitude: number; accuracy: number }
  ): Promise<Device> => {
    return apiClient.post<Device>(`/api/devices/${id}/location`, location);
  },
};

// User permissions API
export const userApi = {
  getPermissions: (): Promise<UserPermissions> => {
    return apiClient.get<UserPermissions>("/api/user/permissions");
  },
};

// Themes API
export const themesApi = {
  getByOperator: (operator: string): Promise<Theme> => {
    return apiClient.get<Theme>(`/api/themes/${operator}`);
  },
};

// Internationalization API
export const i18nApi = {
  getByLanguage: (language: string): Promise<I18nData> => {
    return apiClient.get<I18nData>(`/api/i18n/${language}`);
  },
};

// Geolocation API
export const geolocationApi = {
  getMockLocations: (): Promise<
    Array<{
      id: string;
      name: string;
      latitude: number;
      longitude: number;
      accuracy: number;
      address: string;
    }>
  > => {
    return apiClient.get("/api/geolocation/mock-locations");
  },

  getMockRoute: (
    deviceId: string
  ): Promise<{
    deviceId: string;
    points: Array<{
      latitude: number;
      longitude: number;
      timestamp: string;
      speed: number;
    }>;
  }> => {
    return apiClient.get(`/api/geolocation/mock-route/${deviceId}`);
  },
};

// Authentication API
export const authApi = {
  sendVerificationCode: (
    phoneNumber: string
  ): Promise<{
    success: boolean;
    message: string;
    expiresIn: number;
  }> => {
    return apiClient.post("/api/auth/send-code", { phoneNumber });
  },

  verifyCode: (
    phoneNumber: string,
    code: string
  ): Promise<{
    success: boolean;
    user?: any;
    token?: string;
    error?: string;
  }> => {
    return apiClient.post("/api/auth/verify-code", { phoneNumber, code });
  },
};

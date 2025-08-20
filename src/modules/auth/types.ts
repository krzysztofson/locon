export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "viewer";
  avatar?: string;
  permissions?: {
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
  };
  preferences?: {
    language: string;
    theme: string;
    notifications: {
      push: boolean;
      email: boolean;
      sms: boolean;
    };
  };
  createdAt?: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  phone: string;
  otp: string;
}

export interface RegisterData {
  phone: string;
  name: string;
  email?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
}

export interface VerifyOTPResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

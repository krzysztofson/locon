import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../../services/api/services";
import { LoginCredentials, RegisterData, User } from "./types";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

class AuthService {
  async sendOTP(phoneNumber: string): Promise<void> {
    try {
      const response = await authApi.sendVerificationCode(phoneNumber);
      if (!response.success) {
        throw new Error("Nie udało się wysłać kodu OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw new Error("Błąd wysyłania kodu OTP");
    }
  }

  async verifyOTP(phoneNumber: string, code: string): Promise<User> {
    try {
      const response = await authApi.verifyCode(phoneNumber, code);

      if (!response.success || !response.user || !response.token) {
        throw new Error(response.error || "Nieprawidłowy kod OTP");
      }

      // Save token and user data to secure storage
      await AsyncStorage.setItem(TOKEN_KEY, response.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));

      return response.user;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Błąd weryfikacji kodu OTP");
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    // For OTP login, use verifyOTP method
    return this.verifyOTP(credentials.phone, credentials.otp);
  }

  async register(data: RegisterData): Promise<User> {
    // Mock implementation - not needed for OTP auth
    throw new Error("Registration not implemented");
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      const user = await this.getCurrentUser();
      return !!(token && user);
    } catch (error) {
      console.error("Error checking auth state:", error);
      return false;
    }
  }
}

export const authService = new AuthService();

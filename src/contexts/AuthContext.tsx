import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../modules/auth/AuthService";
import { User } from "../modules/auth/types";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  sendOTP: (phone: string) => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const isAuth = await authService.isAuthenticated();

      if (isAuth) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (phone: string) => {
    try {
      await authService.sendOTP(phone);
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  const login = async (phone: string, otp: string) => {
    try {
      await authService.verifyOTP(phone, otp);
      await checkAuthState();
    } catch (error) {
      throw error;
    }
  };

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      await authService.verifyOTP(phone, otp);
      await checkAuthState();
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    sendOTP,
    verifyOTP,
    logout,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

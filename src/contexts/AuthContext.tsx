import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSlice } from "../state/slices/authSlice";
import { authService } from "../modules/auth/AuthService";
import { User } from "../modules/auth/types";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  sendOTP: (phone: string) => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  setRole: (role: User["role"]) => void;
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
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const isAuth = await authService.isAuthenticated();

      if (isAuth) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          dispatch(authSlice.actions.loginSuccess(userData as User));
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        dispatch(authSlice.actions.logout());
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

  const setRole = (role: User["role"]) => {
    setUser((prev) => {
      const base = prev || {
        id: "local-admin",
        name: "Admin",
        email: "admin@example.com",
        phone: "+48000000000",
        role: "admin" as const,
      };
      return { ...base, role } as User;
    });
    setIsAuthenticated(true);
    // Dispatch sync after state update microtask
    setTimeout(() => {
      const u = user || {
        id: "local-admin",
        name: "Admin",
        email: "admin@example.com",
        phone: "+48000000000",
        role: "admin" as const,
      };
      dispatch(authSlice.actions.loginSuccess({ ...u, role } as User));
    }, 0);
  };

  // Default to admin if no user (development convenience)
  useEffect(() => {
    if (!user && !isLoading) {
      setRole("admin");
    }
  }, [user, isLoading]);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    sendOTP,
    verifyOTP,
    logout,
    user,
    setRole,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

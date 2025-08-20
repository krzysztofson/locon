import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../modules/auth/types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
// Demo users (for quick role switching in mock environment if needed)
export const DEMO_USERS: Record<string, User> = {
  admin: {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    phone: "+48111111111",
    role: "admin",
  },
  user: {
    id: "2",
    name: "Użytkownik",
    email: "user@example.com",
    phone: "+48222222222",
    role: "user",
  },
  viewer: {
    id: "3",
    name: "Podgląd",
    email: "viewer@example.com",
    phone: "+48333333333",
    role: "viewer",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

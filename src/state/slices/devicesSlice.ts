import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "../../types";

interface DevicesState {
  devices: Device[];
  selectedDeviceId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DevicesState = {
  devices: [],
  selectedDeviceId: null,
  isLoading: false,
  error: null,
};

export const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    fetchDevicesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDevicesSuccess: (state, action: PayloadAction<Device[]>) => {
      state.isLoading = false;
      state.devices = action.payload;
      state.error = null;

      // Auto-select first device if none selected
      if (!state.selectedDeviceId && action.payload.length > 0) {
        state.selectedDeviceId = action.payload[0].id;
      }
    },
    fetchDevicesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectDevice: (state, action: PayloadAction<string>) => {
      state.selectedDeviceId = action.payload;
    },
    updateDeviceLocation: (
      state,
      action: PayloadAction<{
        deviceId: string;
        location: { lat: number; lon: number; at: string };
      }>
    ) => {
      const device = state.devices.find(
        (d) => d.id === action.payload.deviceId
      );
      if (device) {
        device.lastLocation = action.payload.location;
      }
    },
    addDevice: (state, action: PayloadAction<Device>) => {
      state.devices.push(action.payload);
    },
    updateDevice: (state, action: PayloadAction<Device>) => {
      const index = state.devices.findIndex(
        (device) => device.id === action.payload.id
      );
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    },
    removeDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter(
        (device) => device.id !== action.payload
      );
      if (state.selectedDeviceId === action.payload) {
        state.selectedDeviceId =
          state.devices.length > 0 ? state.devices[0].id : null;
      }
    },
  },
});

export const {
  fetchDevicesStart,
  fetchDevicesSuccess,
  fetchDevicesFailure,
  selectDevice,
  updateDeviceLocation,
  addDevice,
  updateDevice,
  removeDevice,
} = devicesSlice.actions;

export default devicesSlice.reducer;

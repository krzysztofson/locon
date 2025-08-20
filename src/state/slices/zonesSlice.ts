import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Zone } from "../../modules/zones/types";
import {
  fetchZonesAsync,
  toggleZoneActiveAsync,
  deleteZoneAsync,
  updateZoneAsync,
  createZoneAsync,
} from "./zonesThunks";

interface ZonesState {
  zones: Zone[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ZonesState = {
  zones: [],
  isLoading: false,
  error: null,
};

export const zonesSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {
    fetchZonesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchZonesSuccess: (state, action: PayloadAction<Zone[]>) => {
      state.isLoading = false;
      state.zones = action.payload;
      state.error = null;
    },
    fetchZonesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addZone: (state, action: PayloadAction<Zone>) => {
      state.zones.push(action.payload);
    },
    updateZone: (state, action: PayloadAction<Zone>) => {
      const index = state.zones.findIndex(
        (zone) => zone.id === action.payload.id
      );
      if (index !== -1) {
        state.zones[index] = action.payload;
      }
    },
    removeZone: (state, action: PayloadAction<string>) => {
      state.zones = state.zones.filter((zone) => zone.id !== action.payload);
    },
    toggleZoneActive: (state, action: PayloadAction<string>) => {
      const zone = state.zones.find((zone) => zone.id === action.payload);
      if (zone) {
        zone.isActive = !zone.isActive;
      }
    },
    refreshZones: (state) => {
      state.isLoading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch zones
      .addCase(fetchZonesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchZonesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.zones = action.payload;
        state.error = null;
      })
      .addCase(fetchZonesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch zones";
      })
      // Toggle zone active
      .addCase(toggleZoneActiveAsync.fulfilled, (state, action) => {
        const index = state.zones.findIndex(
          (zone) => zone.id === action.payload.id
        );
        if (index !== -1) {
          state.zones[index] = action.payload;
        }
      })
      // Delete zone
      .addCase(deleteZoneAsync.fulfilled, (state, action) => {
        state.zones = state.zones.filter((zone) => zone.id !== action.payload);
      })
      // Update zone
      .addCase(updateZoneAsync.fulfilled, (state, action) => {
        const index = state.zones.findIndex(
          (zone) => zone.id === action.payload.id
        );
        if (index !== -1) {
          state.zones[index] = action.payload;
        }
      })
      // Create zone
      .addCase(createZoneAsync.fulfilled, (state, action) => {
        state.zones.push(action.payload);
      });
  },
});

export const {
  fetchZonesStart,
  fetchZonesSuccess,
  fetchZonesFailure,
  addZone,
  updateZone,
  removeZone,
  toggleZoneActive,
  refreshZones,
} = zonesSlice.actions;

export default zonesSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Zone } from '../../modules/zones/types';

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
  name: 'zones',
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
      const index = state.zones.findIndex(zone => zone.id === action.payload.id);
      if (index !== -1) {
        state.zones[index] = action.payload;
      }
    },
    removeZone: (state, action: PayloadAction<string>) => {
      state.zones = state.zones.filter(zone => zone.id !== action.payload);
    },
  },
});

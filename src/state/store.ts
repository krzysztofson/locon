import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { zonesSlice } from './slices/zonesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    zones: zonesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { create } from "zustand";

export interface ZoneDraft {
  name: string | null;
  icon: string | null;
  center: { lat: number; lng: number } | null;
  radius: number | null;
  notificationsByDevice: Record<string, boolean>;
}

interface ZoneCreatorState {
  zoneDraft: ZoneDraft;
  setNameIcon: (name: string, icon: string) => void;
  setCenter: (center: { lat: number; lng: number }) => void;
  setRadius: (radius: number) => void;
  setNotifications: (deviceId: string, value: boolean) => void;
  reset: () => void;
}

const initialDraft: ZoneDraft = {
  name: null,
  icon: null,
  center: null,
  radius: null,
  notificationsByDevice: {},
};

export const useZoneCreatorStore = create<ZoneCreatorState>((set) => ({
  zoneDraft: initialDraft,
  setNameIcon: (name: string, icon: string) =>
    set((s: ZoneCreatorState) => ({
      zoneDraft: { ...s.zoneDraft, name, icon },
    })),
  setCenter: (center: { lat: number; lng: number }) =>
    set((s: ZoneCreatorState) => ({ zoneDraft: { ...s.zoneDraft, center } })),
  setRadius: (radius: number) =>
    set((s: ZoneCreatorState) => ({ zoneDraft: { ...s.zoneDraft, radius } })),
  setNotifications: (deviceId: string, value: boolean) =>
    set((s: ZoneCreatorState) => ({
      zoneDraft: {
        ...s.zoneDraft,
        notificationsByDevice: {
          ...s.zoneDraft.notificationsByDevice,
          [deviceId]: value,
        },
      },
    })),
  reset: () => set({ zoneDraft: initialDraft }),
}));

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Zone } from "../../modules/zones/types";
import { zonesService } from "../../services/zonesService";

export const fetchZonesAsync = createAsyncThunk(
  "zones/fetchZones",
  async () => {
    const zones = await zonesService.fetchZones();
    return zones;
  }
);

export const toggleZoneActiveAsync = createAsyncThunk(
  "zones/toggleZoneActive",
  async (zoneId: string) => {
    const zone = await zonesService.toggleZoneActive(zoneId);
    return zone;
  }
);

export const deleteZoneAsync = createAsyncThunk(
  "zones/deleteZone",
  async (zoneId: string) => {
    await zonesService.deleteZone(zoneId);
    return zoneId;
  }
);

export const updateZoneAsync = createAsyncThunk(
  "zones/updateZone",
  async (zone: Zone) => {
    const updatedZone = await zonesService.updateZone(zone);
    return updatedZone;
  }
);

export const createZoneAsync = createAsyncThunk(
  "zones/createZone",
  async (zoneData: Omit<Zone, "id" | "createdAt" | "updatedAt">) => {
    const newZone = await zonesService.createZone(zoneData);
    return newZone;
  }
);

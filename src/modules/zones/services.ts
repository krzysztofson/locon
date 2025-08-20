import { Zone, ZoneCreationData } from "./types";
import { zonesApi } from "../../services/api/services";

class ZonesService {
  async getZones(): Promise<Zone[]> {
    try {
      return await zonesApi.getAll();
    } catch (error) {
      console.error("Failed to fetch zones:", error);
      return [];
    }
  }

  async createZone(data: ZoneCreationData): Promise<Zone> {
    try {
      return await zonesApi.create(data);
    } catch (error) {
      console.error("Failed to create zone:", error);
      throw error;
    }
  }

  async updateZone(zone: Zone): Promise<Zone> {
    try {
      return await zonesApi.update(zone.id, zone);
    } catch (error) {
      console.error("Failed to update zone:", error);
      throw error;
    }
  }

  async deleteZone(zoneId: string): Promise<void> {
    try {
      await zonesApi.delete(zoneId);
    } catch (error) {
      console.error("Failed to delete zone:", error);
      throw error;
    }
  }

  async getZoneById(zoneId: string): Promise<Zone | null> {
    try {
      return await zonesApi.getById(zoneId);
    } catch (error) {
      console.error("Failed to fetch zone:", error);
      return null;
    }
  }
}

export const zonesService = new ZonesService();

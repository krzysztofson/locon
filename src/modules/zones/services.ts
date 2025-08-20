// (Legacy/unused) Placeholder service. Real logic lives in services/zonesService.ts
// Kept to avoid import breakages if any older code references this path.
import { Zone, ZoneCreationData } from "./types";

class LegacyZonesServiceStub {
  async getZones(): Promise<Zone[]> {
    return [];
  }
  async createZone(data: ZoneCreationData): Promise<Zone> {
    return {
      id: "legacy",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notificationsByDevice: data.notificationsByDevice || {},
      ...data,
      createdBy: "legacy",
    } as Zone;
  }
  async updateZone(zone: Zone): Promise<Zone> {
    return zone;
  }
  async deleteZone(): Promise<void> {
    /* noop */
  }
  async getZoneById(): Promise<Zone | null> {
    return null;
  }
}

export const zonesService = new LegacyZonesServiceStub();

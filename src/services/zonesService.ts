import { Zone } from "../modules/zones/types";
import { MOCK_ZONES } from "../data/mockData";
import type { Zone as MockZoneType } from "../types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class ZonesService {
  private zones: Zone[] = [];

  async fetchZones(): Promise<Zone[]> {
    await delay(500); // Simulate network delay

    if (this.zones.length === 0) {
      // Initialize with mock data converted to Zone interface
      this.zones = MOCK_ZONES.map((mockZone) => {
        const zone: Zone = {
          id: mockZone.id,
          name: mockZone.name,
          description: `Strefa ${mockZone.name}`,
          type: mockZone.name.toLowerCase().includes("dom")
            ? "home"
            : mockZone.name.toLowerCase().includes("szkoła")
            ? "school"
            : "other",
          coordinates: {
            latitude: mockZone.center.lat,
            longitude: mockZone.center.lon,
            radius: mockZone.radius,
          },
          address: `${mockZone.name} - lokalizacja`,
          isActive: mockZone.active,
          notifications: {
            onEntry: true,
            onExit: true,
            sound: true,
            vibration: true,
          },
          devices: Object.keys(mockZone.notificationsByDevice).filter(
            (deviceId) => mockZone.notificationsByDevice[deviceId]
          ),
          notificationsByDevice: { ...mockZone.notificationsByDevice },
          schedule: {
            enabled: false,
            activeHours: { start: "00:00", end: "23:59" },
            activeDays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
          },
          createdAt: mockZone.createdAt,
          updatedAt: mockZone.createdAt,
          createdBy: "user1",
          color: mockZone.color || "#4CAF50",
        };
        return zone;
      });
    }

    return [...this.zones];
  }

  async toggleZoneActive(zoneId: string): Promise<Zone> {
    await delay(200);

    const zone = this.zones.find((z) => z.id === zoneId);
    if (!zone) {
      throw new Error("Zone not found");
    }

    zone.isActive = !zone.isActive;
    zone.updatedAt = new Date().toISOString();

    return { ...zone };
  }

  async deleteZone(zoneId: string): Promise<void> {
    await delay(300);

    const index = this.zones.findIndex((z) => z.id === zoneId);
    if (index === -1) {
      throw new Error("Zone not found");
    }

    this.zones.splice(index, 1);
  }

  async updateZone(zone: Zone): Promise<Zone> {
    await delay(400);

    const index = this.zones.findIndex((z) => z.id === zone.id);
    if (index === -1) {
      throw new Error("Zone not found");
    }

    zone.updatedAt = new Date().toISOString();
    this.zones[index] = { ...zone };

    return { ...zone };
  }

  async createZone(
    zoneData: Omit<Zone, "id" | "createdAt" | "updatedAt">
  ): Promise<Zone> {
    await delay(500);

    const newZone: Zone = {
      ...zoneData,
      id: `zone_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notificationsByDevice: (zoneData as any).notificationsByDevice || {},
    };

    this.zones.push(newZone);

    return { ...newZone };
  }
}

export const zonesService = new ZonesService();

import { GeofenceRegion, GeofenceEvent } from './types';

class GeofencingService {
  async addGeofence(region: GeofenceRegion): Promise<void> {
    // Mock implementation
    throw new Error('Not implemented');
  }

  async removeGeofence(regionId: string): Promise<void> {
    // Mock implementation
    throw new Error('Not implemented');
  }

  async startMonitoring(): Promise<void> {
    // Mock implementation
    throw new Error('Not implemented');
  }

  async stopMonitoring(): Promise<void> {
    // Mock implementation
    throw new Error('Not implemented');
  }

  onGeofenceEvent(callback: (event: GeofenceEvent) => void): void {
    // Mock implementation
    throw new Error('Not implemented');
  }
}

export const geofencingService = new GeofencingService();

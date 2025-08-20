import { Location } from './types';

class LocationService {
  async getCurrentLocation(): Promise<Location> {
    // Mock implementation
    throw new Error('Not implemented');
  }

  async watchPosition(callback: (location: Location) => void): Promise<number> {
    // Mock implementation
    throw new Error('Not implemented');
  }

  async clearWatch(watchId: number): Promise<void> {
    // Mock implementation
    throw new Error('Not implemented');
  }

  async requestPermissions(): Promise<boolean> {
    // Mock implementation
    return false;
  }
}

export const locationService = new LocationService();

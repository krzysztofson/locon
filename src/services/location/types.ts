export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: Date;
}

export interface GeofenceRegion {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;
}

export interface GeofenceEvent {
  type: 'enter' | 'exit';
  region: GeofenceRegion;
  location: Location;
  timestamp: Date;
}

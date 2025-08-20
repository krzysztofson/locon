import { Zone } from '../modules/zones/types';
import { User } from '../modules/auth/types';

export const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
};

export const mockZone: Zone = {
  id: '1',
  name: 'Test Zone',
  description: 'A test zone',
  coordinates: { latitude: 52.2297, longitude: 21.0122 },
  radius: 100,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

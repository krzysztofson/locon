import { Zone } from '../../modules/zones/types';
import { User } from '../../modules/auth/types';

// Mock data for development
export const mockZones: Zone[] = [
  {
    id: '1',
    name: 'Home Zone',
    description: 'Around my house',
    coordinates: { latitude: 52.2297, longitude: 21.0122 },
    radius: 100,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Work Zone',
    description: 'Office building',
    coordinates: { latitude: 52.2319, longitude: 21.0067 },
    radius: 50,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
};

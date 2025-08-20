import React from 'react';
import { View, Text } from 'react-native';
import { Zone } from './types';

interface ZoneEditProps {
  zone: Zone;
  onZoneUpdate: (zone: Zone) => void;
}

export const ZoneEdit: React.FC<ZoneEditProps> = ({ zone, onZoneUpdate }) => {
  return (
    <View>
      <Text>Zone Edit: {zone.name}</Text>
      {/* Zone edit form will go here */}
    </View>
  );
};

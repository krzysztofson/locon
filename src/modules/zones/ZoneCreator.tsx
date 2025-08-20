import React from 'react';
import { View, Text } from 'react-native';
import { ZoneCreationData } from './types';

interface ZoneCreatorProps {
  onZoneCreate: (data: ZoneCreationData) => void;
}

export const ZoneCreator: React.FC<ZoneCreatorProps> = ({ onZoneCreate }) => {
  return (
    <View>
      <Text>Zone Creator</Text>
      {/* Zone creation form will go here */}
    </View>
  );
};

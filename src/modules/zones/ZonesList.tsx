import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Zone } from './types';

interface ZonesListProps {
  zones: Zone[];
  onZonePress: (zone: Zone) => void;
}

export const ZonesList: React.FC<ZonesListProps> = ({ zones, onZonePress }) => {
  return (
    <View>
      <Text>Zones List</Text>
      <FlatList
        data={zones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text onPress={() => onZonePress(item)}>{item.name}</Text>
        )}
      />
    </View>
  );
};

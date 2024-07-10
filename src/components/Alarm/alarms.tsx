import React from 'react';
import { FlatList } from 'react-native';

import AlaramComponent from './alarm';

import { Alarm } from '@type/entity/alarm';

interface AlaramsComponentProps {
  alarms: Alarm[];
  loadMoreAlarms: () => void;
  toMatchingRoom: (roomId: number, roomType: string) => void;
}

const AlaramsComponent: React.FC<AlaramsComponentProps> = ({
  alarms,
  loadMoreAlarms,
  toMatchingRoom,
}) => {
  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 32 }}
      data={alarms}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <AlaramComponent alarm={item} toMatchingRoom={toMatchingRoom} />}
      onEndReached={loadMoreAlarms}
      onEndReachedThreshold={0.7}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default AlaramsComponent;

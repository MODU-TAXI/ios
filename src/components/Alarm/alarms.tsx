import React from 'react';
import { FlatList } from 'react-native';

import AlaramComponent from './alarm';

import { Alarm } from '@type/entity/alarm';

interface AlaramsComponentProps {
  alarms: Alarm[];
  loadMoreAlarms: () => void;
}

const AlaramsComponent: React.FC<AlaramsComponentProps> = ({ alarms, loadMoreAlarms }) => {
  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 32 }}
      data={alarms}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <AlaramComponent alarm={item} />}
      onEndReached={loadMoreAlarms}
      onEndReachedThreshold={0.7}
    />
  );
};

export default AlaramsComponent;

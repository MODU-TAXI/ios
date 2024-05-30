import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AlaramComponent from './alarm';

import { Alarm } from '@type/entity/alarm';

interface AlaramsComponentProps {
  alarms: Alarm[];
}

const AlaramsComponent: React.FC<AlaramsComponentProps> = ({ alarms }) => {
  return (
    <ScrollView className="flex-col px-4 py-8">
      {alarms.map((alarm) => (
        <AlaramComponent alarm={alarm} />
      ))}
    </ScrollView>
  );
};

export default AlaramsComponent;

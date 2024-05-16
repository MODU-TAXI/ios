import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import PartyComponent from './Party';

const parties = [
  {
    id: 1,
    startTime: '14:25',
    arrivalName: '인하대학교',
    departureName: '주안역',
    arrivalTime: 2,
    wishHeadcount: 3000,
  },
  {
    id: 2,
    startTime: '14:25',
    arrivalName: '인하대학교',
    departureName: '주안역',
    arrivalTime: 2,
    wishHeadcount: 3000,
  },
  {
    id: 3,
    startTime: '14:25',
    arrivalName: '인하대학교',
    departureName: '주안역',
    arrivalTime: 2,
    wishHeadcount: 3000,
  },
  {
    id: 4,
    startTime: '14:25',
    arrivalName: '인하대학교',
    departureName: '주안역',
    arrivalTime: 2,
    wishHeadcount: 3000,
  },
];

const PartiesComponent: React.FC = () => {
  return (
    <View className="mt-8">
      <View>
        <Text className="text-[18px] font-semibold">실시간 택시팟을 알려드려요!</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-2">
        {parties.map((party) => (
          <PartyComponent />
        ))}
      </ScrollView>
    </View>
  );
};

export default PartiesComponent;

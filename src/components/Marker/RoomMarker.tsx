import React from 'react';
import { View, Text } from 'react-native';

import ChevronForwardSvg from '@assets/images/Map/chevronForward.svg';

interface RoomMarkerProps {
  spotName: string;
}

/** 매칭방 한개 마커 */
const RoomMarkerComponent: React.FC<RoomMarkerProps> = ({ spotName }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View
        className="m-4 flex w-auto flex-row rounded-full border-gray100 bg-white"
        style={{
          shadowColor: 'rgba(102, 102, 102, 0.25)',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 1,
          elevation: 8,
        }}
      >
        <Text className="w-fit py-2 pl-4 text-center text-base text-gray600">
          {spotName}
        </Text>
        <View className="flex justify-center pr-2">
          <ChevronForwardSvg />
        </View>
      </View>
    </View>
  );
};

export default RoomMarkerComponent;

import React from 'react';
import { Text, View } from 'react-native';

import ClickedMap from '@assets/images/BottomTab/ClickedMap.svg';
import UnCilckedMap from '@assets/images/BottomTab/UnCilckedMap.svg';

interface MapTabComponentComponentProps {
  focused: boolean;
}

const MapTabComponent: React.FC<MapTabComponentComponentProps> = ({ focused }) => {
  if (focused) {
    return (
      <View className="flex items-center justify-center">
        <ClickedMap />

        <Text className="mt-1 text-[12px] font-semibold text-main">지도</Text>
      </View>
    );
  }

  return (
    <View className="flex items-center justify-center">
      <UnCilckedMap />

      <Text className="mt-1 text-[12px] font-semibold text-[#AFAFAF]">지도</Text>
    </View>
  );
};

export default MapTabComponent;

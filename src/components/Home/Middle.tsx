import React from 'react';
import { View, Pressable } from 'react-native';

import Map from '@assets/images/Home/Map.svg';

interface MiddleComponentProps {
  toMapScreen: () => void;
  toCreateRoomScreen: () => void;
}

const MiddleComponent: React.FC<MiddleComponentProps> = ({ toMapScreen, toCreateRoomScreen }) => {
  return (
    <View className="mt-[18px] flex-row items-center px-4">
      <Pressable onPress={toMapScreen} className="mr-4 flex-1">
        <Map />
      </Pressable>

      <Pressable onPress={toCreateRoomScreen} className="flex-1">
        <Map />
      </Pressable>
    </View>
  );
};

export default MiddleComponent;

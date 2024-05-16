import React from 'react';
import { Text, View, Pressable } from 'react-native';

import Car from '@assets/images/Home/Car.svg';
import Map from '@assets/images/Home/Map.svg';

interface MiddleComponentProps {
  toMapScreen: () => void;
  toCreateRoomScreen: () => void;
}

const MiddleComponent: React.FC<MiddleComponentProps> = ({ toMapScreen, toCreateRoomScreen }) => {
  return (
    <View className="mt-8 flex-row items-center justify-between">
      <View>
        <View className="mb-2 px-1">
          <Text className="text-[18px] font-semibold">지도</Text>
        </View>

        <Pressable onPress={toMapScreen} className="h-[162px] w-[162px]">
          <Car />
        </Pressable>
      </View>

      <View>
        <View className="mb-2 px-1">
          <Text className="text-[18px] font-semibold">택시팟 만들기</Text>
        </View>

        <Pressable onPress={toCreateRoomScreen}>
          <Car />
        </Pressable>
      </View>
    </View>
  );
};

export default MiddleComponent;

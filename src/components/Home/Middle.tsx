import React from 'react';
import { Text, View, Pressable } from 'react-native';

import Taxi from '@assets/images/Home/Taxi.svg';
import Road from '@assets/images/Home/Road.svg';

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
          <Road />
          {/* <Taxi className="absolute" /> */}
        </Pressable>
      </View>

      <View>
        <View className="mb-2 px-1">
          <Text className="text-[18px] font-semibold">택시팟 만들기</Text>
        </View>

        <Pressable onPress={toCreateRoomScreen}>
          <Road />
        </Pressable>
      </View>
    </View>
  );
};

export default MiddleComponent;

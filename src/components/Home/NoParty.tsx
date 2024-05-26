import React from 'react';
import { View, Text } from 'react-native';

import SadFace from '@assets/images/Home/SadFace.svg';

const NoPartyComponent = () => {
  return (
    <View className="px-4">
      <Text className="text-[18px] font-semibold">내가 참여중인 택시팟</Text>

      <View className="mt-4 h-[126px] w-full flex-row  items-center justify-center rounded-xl bg-[#EBEBEB]">
        <Text className="mr-1 font-semibold text-[#7C7C7C]">아직 참여중인 택시팟이 없어요</Text>
        <SadFace />
      </View>
    </View>
  );
};

export default NoPartyComponent;

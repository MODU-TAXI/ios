import React from 'react';
import { View, Text } from 'react-native';

import SadFace from '@assets/images/Home/SadFace.svg';

const NoPartyComponent = () => {
  return (
    <View className="px-4">
      <Text className="text-[18px] font-semibold">내가 참여중인 택시팟</Text>

      <View className="mt-3 h-[128px] flex-col items-center justify-center rounded-xl border-2 border-[#EBEBEB]">
        <SadFace />
        <Text className="mt-2 text-[12px] font-medium tracking-tight text-[#D7D7D7]">
          아직 참여중인 택시팟이 없어요
        </Text>
      </View>
    </View>
  );
};

export default NoPartyComponent;

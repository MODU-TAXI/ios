import React from 'react';
import { View, Text } from 'react-native';

import Arrow from '@assets/images/Chat/Arrow.svg';
import Money from '@assets/images/Chat/Money.svg';
import Check from '@assets/images/Home/Check.svg';
import People from '@assets/images/Chat/People.svg';

const PartyComponent: React.FC = () => {
  return (
    <View className="mr-4 rounded-xl border-2 border-[#EBEBEB] px-4 py-3">
      {/* 출발 시각 */}
      <View className="flex-row items-center rounded-lg bg-[#EBFBF7] px-3 py-1">
        <Check className="mr-1" />
        <Text className="text-[12px] font-medium text-main">출발 14:25</Text>
      </View>

      {/* 출발지, 도착지 */}
      <View className="mt-2 flex-row">
        <View>
          <Text className="text-[16px] font-semibold text-[#272727]">인하대학교</Text>
        </View>

        <Arrow className="mx-2" />

        <View>
          <Text className="text-[16px] font-semibold text-[#272727]">주안역</Text>
        </View>
      </View>

      {/* 인원수, 가격 */}
      <View className="mt-2  flex-row">
        <View className="mr-2 flex-row items-center justify-center">
          <People className="mr-1" />
          <Text className="text-[12px] text-[#7c7c7c]">2 / 3</Text>
        </View>

        <View className="flex-row items-center justify-center">
          <Money className="mr-1" />
          <Text className="text-[12px] text-[#7c7c7c]">인당 3000원</Text>
        </View>
      </View>
    </View>
  );
};

export default PartyComponent;

import React from 'react';
import { Text, View } from 'react-native';

import Check from '@assets/images/Home/Popper.svg';
import Receipt from '@assets/images/Home/Receipt.svg';

const EtcComponent: React.FC = () => {
  return (
    <View className="mb-[120px] flex-row items-center px-4">
      <View className="mr-4">
        <Text className="px-1 text-[18px] font-semibold">이용내역</Text>

        <View className="mt-4 flex-row rounded-2xl border-[1px] border-gray200 px-3 py-4">
          <Receipt className="mr-1" width={32} />

          <View>
            <Text className="text-[12px] font-medium text-[#5d5d5d]">5월 한달동안</Text>

            <View className="mt-1 flex-row items-center">
              <Text className="font-semibold text-[#10A2F4]">16700원 </Text>
              <Text className="text-[12px] font-medium text-[#5d5d5d]">아꼈어요!</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text className="px-1 text-[18px] font-semibold">나의 매칭률</Text>

        <View className="mt-4 flex-row rounded-2xl border-[1px] border-gray200 px-3 py-4">
          <Check className="mr-1" width={38}/>

          <View className="flex-col">
            <Text className="text-[12px] font-medium text-[#5d5d5d]">현재 상위 1%에요!</Text>

            <View className="mt-1">
              <Text className="font-semibold text-[#10A2F4]">매칭률 97%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EtcComponent;

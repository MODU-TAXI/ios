import React from 'react';
import { View, Text } from 'react-native';

import { RoomList } from '@type/entity/room';

import Arrow from '@assets/images/Chat/Arrow.svg';
import Money from '@assets/images/Chat/Money.svg';
import Check from '@assets/images/Home/Check.svg';
import People from '@assets/images/Chat/People.svg';

interface PartyComponentProps {
  roomDetail: RoomList;
}

const PartyComponent: React.FC<PartyComponentProps> = ({
  roomDetail
}) => {
  return (
    <View className="mr-4 rounded-xl border-[1px] border-gray200 px-4 py-3">
      {/* 출발 시각 */}
      <View className="w-[100px] flex-row items-center justify-center rounded-lg bg-[#EBFBF7] px-3 py-1">
        <Check className="mr-1" width={12} />
        <Text className="text-[12px] font-medium text-main">출발 {roomDetail.arrivalTime}</Text>
      </View>

      {/* 출발지, 도착지 */}
      <View className="mt-2 flex-row items-center">
        <View>
          <Text className="text-[14px] font-semibold text-gray800">{roomDetail.departureName}</Text>
        </View>

        <Arrow className="mx-2" />

        <View>
          <Text className="text-[14px] font-semibold text-gray800">{roomDetail.arrivalName}</Text>
        </View>
      </View>

      {/* 인원수, 가격 */}
      <View className="mt-2 flex-row">
        <View className="mr-2 flex-row items-center justify-center">
          <People className="mr-1" />
          <Text className="text-[12px] text-[#7c7c7c]">{roomDetail.currentHeadcount + 1} / {roomDetail.wishHeadcount + 1}</Text>
        </View>

        <View className="flex-row items-center justify-center">
          <Money className="mr-1" />
          <Text className="text-[12px] text-[#7c7c7c]">인당 {roomDetail.expectedChargePerPerson}원</Text>
        </View>
      </View>
    </View>
  );
};

export default PartyComponent;

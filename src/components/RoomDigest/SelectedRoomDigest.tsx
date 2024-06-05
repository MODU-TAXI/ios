import React from "react";
import { View, Text } from 'react-native';

import { useGetRoom } from "@hooks/api/rooms";

import Arrow from '@assets/images/Chat/Arrow.svg';
import Money from '@assets/images/Chat/Money.svg';
import Check from '@assets/images/Home/Check.svg';
import People from '@assets/images/Chat/People.svg';

interface SelectedRoomDigestProps {
  roomId: number;
}

const SelectedRoomDigestComponent: React.FC<SelectedRoomDigestProps> = ({
  roomId
}) => {
  // 해당 roomId로 방 정보 호출
  const { roomDetail, getRoomRefetch } = useGetRoom(roomId);

  return (
    <View className="mx-6 flex w-auto flex-col rounded-xl bg-white p-4 shadow-lg">
      {/* 출발 시각 */}
      <View className="w-[100px] flex-row items-center justify-center rounded-lg bg-[#EBFBF7] px-3 py-1">
        <Check className="mr-1" />
        <Text className="text-[12px] font-medium text-main">출발 {roomDetail.arrivalTime}</Text>
      </View>

      {/* 출발지, 도착지 */}
      <View className="mt-2 flex-row items-center">
        <View>
          <Text className="text-[16px] font-semibold text-[#272727]">{roomDetail.departureName}</Text>
        </View>

        <Arrow className="mx-2" />

        <View>
          <Text className="text-[16px] font-semibold text-[#272727]">{roomDetail.arrivalName}</Text>
        </View>
      </View>

      {/* 인원수, 가격 */}
      <View className="mt-2 flex-row">
        <View className="mr-2 flex-row items-center justify-center">
          <People className="mr-1" />
          <Text className="text-[12px] text-[#7c7c7c]">{roomDetail.currentHeadcount}/{roomDetail.wishHeadcount}</Text>
        </View>

        <View className="flex-row items-center justify-center">
          <Money className="mr-1" />
          <Text className="text-[12px] text-[#7c7c7c]">인당 {roomDetail.expectedChargePerPerson}원</Text>
        </View>
      </View>
    </View>
  );
}

export default SelectedRoomDigestComponent;
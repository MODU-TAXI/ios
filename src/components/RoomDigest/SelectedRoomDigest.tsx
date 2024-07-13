import React from 'react';
import { View, Text } from 'react-native';

import { RoomList } from '@type/entity/room';

import Arrow from '@assets/images/Chat/Arrow.svg';
import Money from '@assets/images/Chat/Money.svg';
import Check from '@assets/images/Home/Check.svg';
import People from '@assets/images/Chat/People.svg';

interface SelectedRoomDigestProps {
  roomId: number;
  roomList: RoomList[];
}

const SelectedRoomDigestComponent: React.FC<SelectedRoomDigestProps> = ({ roomId, roomList }) => {
  const roomDetail = roomList.find((room) => room.roomId === roomId);

  if (!roomDetail) return null;

  return (
    <View className="mx-6 flex w-auto flex-col rounded-xl bg-white p-4 shadow-lg">
      {/* 출발 시각 */}
      <View className="w-[100px] flex-row items-center justify-center rounded-lg bg-[#EBFBF7] px-3 py-1">
        <Check className="mr-1" />
        <Text className="text-[12px] font-medium text-main">출발 {roomDetail.departureTime}</Text>
      </View>

      {/* 출발지, 도착지 */}
      <View className="mt-2 flex-row items-center truncate">
        <View className="shrink flex-col justify-center">
          <Text className="shrink truncate text-[16px] font-semibold text-[#272727]" numberOfLines={1} >
            {roomDetail.departureName}
          </Text>
        </View>

        <View className="my-1 flex-row items-center">
          <Arrow className="mx-2" />
          <Text className="text-[16px] font-semibold text-[#272727]">
            {roomDetail.arrivalName}
          </Text>
        </View>
      </View>

      {/* 인원수, 가격 */}
      <View className="mt-2 flex-row">
        <View className="mr-2 flex-row items-center justify-center">
          <People className="mr-1" />
          <Text className="text-[12px] text-[#7c7c7c]">
            {roomDetail.currentHeadcount}/{roomDetail.wishHeadcount}
          </Text>
        </View>

        <View className="flex-row items-center justify-center">
          <Money className="mr-1" />
          <Text className="text-[12px] text-[#7c7c7c]">
            인당 {roomDetail.expectedChargePerPerson.toLocaleString('ko-KR')}원
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SelectedRoomDigestComponent;

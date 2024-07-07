import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';

import { RoomPreview } from '@type/entity/room';

import Arrow from '@assets/images/Chat/Arrow.svg';
import Money from '@assets/images/Chat/Money.svg';
import Check from '@assets/images/Home/Check.svg';
import People from '@assets/images/Chat/People.svg';

interface MyPartyComponentProps {
  roomPreview: RoomPreview;
  toChatRoomScreen: () => void;
}

const MyPartyComponent: React.FC<MyPartyComponentProps> = ({ roomPreview, toChatRoomScreen }) => {
  return (
    <View className="px-4">
      <Text className="text-[18px] font-semibold">내가 참여중인 택시팟</Text>

      <View className="mt-4 flex-col rounded-xl border-2 border-[#EBEBEB] px-4 py-3">
        {/* 출발 시각 */}
        <View className="w-[100px] flex-row items-center justify-center rounded-lg bg-[#EBFBF7] px-3 py-1">
          <Check className="mr-1" />
          <Text className="text-[12px] font-medium text-main">
            출발 {roomPreview.departureTime}
          </Text>
        </View>

        {/* 출발지, 도착지 */}
        <View className="mt-2 flex-row items-center truncate">
          {/* <View>
            <Text className="text-[16px] font-semibold text-[#272727]">
              {roomPreview.departureName}
            </Text>
          </View>

          <Arrow className="mx-2" /> */}

          <View>
            <Text className="text-[16px] font-semibold text-[#272727]">
              {roomPreview.arrivalName}
            </Text>
          </View>
        </View>

        {/* 인원수, 가격 */}
        <View className="mt-2  flex-row">
          <View className="mr-2 flex-row items-center justify-center">
            <People className="mr-1" />
            <Text className="text-[12px] text-[#7c7c7c]">
              {roomPreview.currentHeadcount} / {roomPreview.wishHeadcount}
            </Text>
          </View>

          <View className="flex-row items-center justify-center">
            <Money className="mr-1" />
            <Text className="text-[12px] text-[#7c7c7c]">
              인당 {roomPreview.expectedChargePerPerson.toLocaleString('ko-KR')}원
            </Text>
          </View>
        </View>

        <Pressable
          className="mt-4 rounded-[8px] border-[1px] border-main px-4 py-3"
          onPress={toChatRoomScreen}
        >
          <Text className="text-center font-medium text-main">매칭방 바로가기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyPartyComponent;

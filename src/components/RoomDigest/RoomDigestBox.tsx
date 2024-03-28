import React from 'react';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';

import ClockFillSvg from '@assets/images/RoomDigest/ClockFill.svg';
import LocationFillSvg from '@assets/images/RoomDigest/LocationFill.svg';
import Person2FillSvg from '@assets/images/RoomDigest/Person2Fill.svg';
import ArrowRightSvg from '@assets/images/RoomDigest/ArrowRight.svg';
import RoomTagComponent from './RoomTag';

const StyledView = styled(View);

interface RoomDigestBoxProps {
  //tags: string[];
  lastChatTime: number;
  ETD: string;
  start: string;
  destination: string;
  currCount: number;
  maxCount: number;
  expense: number;
}

/** 카풀팟 방 미리보기 컴포넌트 */
const RoomDigestBoxComponent = ({
  lastChatTime,
  ETD,
  start,
  destination,
  currCount,
  maxCount,
  expense,
}: RoomDigestBoxProps) => {
  return (
    <StyledView className="flex-1 border border-disabled bg-white shadow-sm rounded-xl p-4 mb-4 w-full h-auto">
      <View className="flex flex-row h-auto mb-4 justify-between items-center">
        <View className="flex flex-row">
          {/** TODO: tags에서 RoomTagComponent 인자 받아오기 */}
          <RoomTagComponent
            label="마감임박"
            textColor="text-[#FF4949]"
            bgColor="bg-[#FCE6E6]"
          />
          <RoomTagComponent
            label="학생인증"
            textColor="text-[#40CEAC]"
            bgColor="bg-[#EBFBF7]"
          />
          <RoomTagComponent
            label="여자만"
            textColor="text-[#9C9C9C]"
            bgColor="bg-[#EBEBEB]"
          />
        </View>
        <Text className="text-xs text-disabled">{lastChatTime}분전 채팅</Text>
      </View>
      <View className="h-auto mb-4">
        <View className="flex flex-row items-center">
          <ClockFillSvg />
          <Text className="font-extrabold mb-1">{ETD}출발</Text>
        </View>
        <View className="flex flex-row items-center">
          <LocationFillSvg />
          <Text className="font-extrabold mr-1">{start}</Text>
          <ArrowRightSvg />
          <Text className="font-extrabold ml-1">{destination}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <View className="flex flex-row items-center ml-1">
          <Person2FillSvg />
          <Text className="text-xs text-disabled ml-1">
            {currCount}/{maxCount}
          </Text>
        </View>
        <Text className="text-xs text-disabled">인당 {expense}원</Text>
      </View>
    </StyledView>
  );
};

export default RoomDigestBoxComponent;

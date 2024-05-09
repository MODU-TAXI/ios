import React from 'react';
import { styled } from 'nativewind';
import { Text, View, Pressable } from 'react-native';

import RoomCategoryComponent from './RoomCategory';

import SpotGraySvg from '@assets/images/RoomDigest/SpotGray.svg';
import DottedLineSvg from '@assets/images/RoomDigest/DottedLine.svg';
import EndgrayCircleSvg from '@assets/images/Match/EndGrayCircle.svg';
import Person2FillSvg from '@assets/images/RoomDigest/Person2Fill.svg';



const StyledView = styled(View);

interface RoomDigestBoxProps {
  //tags: string[];
  lastChatTime: number;
  departureTime: string;
  departureName: string;
  arrivalName: string;
  currentHeadCount: number;
  wishHeadCount: number;
  expectedChargePerPerson: number;
}

/** 카풀팟 방 미리보기 컴포넌트 */
const RoomDigestBoxComponent: React.FC<RoomDigestBoxProps> = ({
  lastChatTime,
  departureTime,
  departureName,
  arrivalName,
  currentHeadCount,
  wishHeadCount,
  expectedChargePerPerson,
}) => {
  return (
    <StyledView className="flex-1 border border-gray100 bg-white rounded-xl px-3.5 py-3 mb-4 w-full h-auto">
      {/** 카테고리, 채팅시각 */}
      <View className="flex flex-row h-auto mb-4 justify-between items-center">
        <View className="flex flex-row">
          {/** TODO: tags에서 RoomTagComponent 인자 받아오기 */}
          <RoomCategoryComponent roomCategory={'학생인증'} />
        </View>
        <Text className="font-medium text-xs text-gray500">
          {lastChatTime}분전 채팅
        </Text>
      </View>

      {/** 출발지, 도착거점 */}
      <View className="flex flex-col h-auto mb-4">
        <View className="flex flex-row items-center">
          <EndgrayCircleSvg width={8} height={8} className="m-1" />
          <Text className="font-medium text-xs text-main pl-1.5">
            출발 {departureTime}
          </Text>
        </View>

        <View className="flex flex-row">
          <DottedLineSvg width={1} height={32} className="px-2 py-0.5" />
          <Text className="font-medium text-base pl-1.5">{departureName}</Text>
        </View>

        <View className="flex flex-row items-center">
          <SpotGraySvg width={8} height={10} className="mx-1 my-0.5" />
          <Text className="font-medium text-base pl-1.5">{arrivalName}</Text>
        </View>
      </View>

      {/** 인원 수, 금액 */}
      <View className="flex flex-row justify-between">
        <View className="flex flex-row items-center ml-1">
          <Person2FillSvg />
          <Text className="font-medium text-xs text-gray500 ml-1">
            {currentHeadCount}/{wishHeadCount}
          </Text>
        </View>
        <Text className="font-medium text-xs text-gray500">
          인당 {expectedChargePerPerson.toLocaleString('ko-KR')}원
        </Text>
      </View>
    </StyledView>
  );
};

export default RoomDigestBoxComponent;

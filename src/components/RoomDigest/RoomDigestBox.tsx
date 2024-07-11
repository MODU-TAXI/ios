import React from 'react';
import { styled } from 'nativewind';
import { Text, View } from 'react-native';

import RoomCategoryComponent from './RoomCategory';

import { translateCategory } from '@utils/room';

import SpotGraySvg from '@assets/images/RoomDigest/SpotGray.svg';
import DottedLineSvg from '@assets/images/RoomDigest/DottedLine.svg';
import EndgrayCircleSvg from '@assets/images/Match/EndGrayCircle.svg';
import Person2FillSvg from '@assets/images/RoomDigest/Person2Fill.svg';



const StyledView = styled(View);

interface RoomDigestBoxProps {
  roomTagBitMaskList: string[];
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
  roomTagBitMaskList,
  lastChatTime,
  departureTime,
  departureName,
  arrivalName,
  currentHeadCount,
  wishHeadCount,
  expectedChargePerPerson,
}) => {
  return (
    <StyledView className="mb-4 h-auto w-full flex-1 rounded-xl border border-gray100 bg-white px-3.5 py-3">
      {/** 카테고리, 채팅시각 */}
      <View className="mb-4 flex h-auto flex-row items-center justify-between">
        <View className="flex flex-row">
          {roomTagBitMaskList.map((roomTag, idx) => (
            <RoomCategoryComponent
              key={idx}
              roomCategory={translateCategory(roomTag)}
            />
          ))}
        </View>
        <Text className="text-xs font-medium text-gray500">
          {lastChatTime}분전 채팅
        </Text>
      </View>

      {/** 출발지, 도착거점 */}
      <View className="mb-4 flex h-auto flex-col">
        <View className="flex flex-row items-center">
          <EndgrayCircleSvg width={8} height={8} className="m-1" />
          <Text className="pl-1.5 text-xs font-medium text-main">
            출발 {departureTime}
          </Text>
        </View>

        <View className="flex flex-row truncate">
          <DottedLineSvg width={1} height={32} className="px-2 py-0.5" />
          <Text className="pl-1.5 font-medium text-base" numberOfLines={1}>{departureName}</Text>
        </View>

        <View className="flex flex-row items-center">
          <SpotGraySvg width={8} height={10} className="mx-1 my-0.5" />
          <Text className="pl-1.5 font-medium text-base" numberOfLines={1}>{arrivalName}</Text>
        </View>
      </View>

      {/** 인원 수, 금액 */}
      <View className="flex flex-row justify-between">
        <View className="ml-1 flex flex-row items-center">
          <Person2FillSvg />
          <Text className="ml-1 text-xs font-medium text-gray500">
            {currentHeadCount}/{wishHeadCount}
          </Text>
        </View>
        <Text className="text-xs font-medium text-gray500">
          인당 {expectedChargePerPerson.toLocaleString('ko-KR')}원
        </Text>
      </View>
    </StyledView>
  );
};

export default RoomDigestBoxComponent;

import React from 'react';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';

import ClockFillSvg from '@assets/images/RoomDigest/ClockFill.svg';
import LocationFillSvg from '@assets/images/RoomDigest/LocationFill.svg';
import Person2FillSvg from '@assets/images/RoomDigest/Person2Fill.svg';

const StyledView = styled(View);

const RoomDigestBoxComponent = () => {
  return (
    <StyledView className="flex-1 border border-disabled shadow rounded-xl p-4 mb-4 w-full h-auto">
      <View className="flex flex-row h-auto mb-4 justify-between items-center">
        <View className="flex flex-row">
          <View className="border border-black rounded-md mr-2">
            <Text className="text-xs px-2 py-1">학생인증</Text>
          </View>
          <View className="border border-black rounded-md mr-2">
            <Text className="text-xs px-2 py-1">여자만</Text>
          </View>
          <View className="border border-black rounded-md mr-2">
            <Text className="text-xs px-2 py-1">조용히</Text>
          </View>
        </View>
        <Text className="text-xs text-disabled">3분전 채팅</Text>
      </View>
      <View className="h-auto mb-4">
        <View className="flex flex-row items-center">
          <ClockFillSvg />
          <Text className="font-extrabold mb-1">몇시몇시출발</Text>
        </View>
        <View className="flex flex-row items-center">
          <LocationFillSvg />
          <Text className="font-extrabold">주안역 ㄱㄱ</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <View className="flex flex-row items-center ml-1">
          <Person2FillSvg />
          <Text className="text-xs text-disabled ml-1">2/3</Text>
        </View>
        <Text className="text-xs text-disabled">인당 얼마원</Text>
      </View>
    </StyledView>
  );
};

export default RoomDigestBoxComponent;

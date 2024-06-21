import React from "react";
import { View, Text } from "react-native";

import CarFillSvg from '@assets/images/Search/CarFill.svg';

/** 검색창 빈 화면 컴포넌트 */
const EmptySearchRenderComponent = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <CarFillSvg className="h-20 w-20" />
      <Text className="text-lg font-semibold text-gray200">오늘은 어디로 떠나볼까요?</Text>
    </View>
  )
};

export default EmptySearchRenderComponent;
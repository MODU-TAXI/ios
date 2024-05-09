import React from 'react';
import { View, Text, Pressable } from 'react-native';

import XmarkSvg from '@assets/images/RoomDigest/XmarkCircleFill.svg';

interface LatestSearchProps {
  keyword: string;
  distance: number;
}

/** 최근 검색어 컴포넌트 */
const LatestSearchComponent: React.FC<LatestSearchProps> = ({
  keyword,
  distance,
}) => {
  const handleDelete = () => {
    // TODO: 삭제 함수 작성
    console.log('삭제');
  };

  return (
    <View className="flex flex-row items-center justify-between border-b border-gray200 py-3">
      <Text className="ml-2 text-base">{keyword}</Text>
      <View className="flex flex-row">
        <Text className="mr-1 text-sm text-gray600">{distance}m</Text>
        <Pressable onPress={handleDelete}>
          <XmarkSvg />
        </Pressable>
      </View>
    </View>
  );
};

export default LatestSearchComponent;

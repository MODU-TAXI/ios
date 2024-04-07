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
    <View className="flex flex-row justify-between items-center py-3 border-b border-gray200">
      <Text className="text-base ml-2">{keyword}</Text>
      <View className="flex flex-row">
        <Text className="text-sm text-gray600 mr-1">{distance}m</Text>
        <Pressable onPress={handleDelete}>
          <XmarkSvg />
        </Pressable>
      </View>
    </View>
  );
};

export default LatestSearchComponent;

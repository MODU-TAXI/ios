import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';


interface RecommendedSearchProps {
  keyword: string;
  fullKeyword: string;
  address: string;
  distance: number;
}

/** 최근 검색어 컴포넌트 */
const RecommendedSearchComponent: React.FC<RecommendedSearchProps> = ({
  keyword,
  fullKeyword,
  address,
  distance,
}) => {
  const restKeyword = fullKeyword.replace(/<\/?b>/g, "");

  // 키워드가 포함된 부분을 찾아서 하이라이트 처리
  const highlightKeyword = (text: string, keyword: string) => {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <>
        {parts.map((part, index) => (
          part.toLowerCase() === keyword.toLowerCase() ? (
            <Text key={index} className='text-[16px] font-medium text-main'>{part}</Text>
          ) : (
            <Text key={index} className='text-[16px] font-medium text-gray800'>{part}</Text>
          )
        ))}
      </>
    );
  };

  return (
    <View className="flex flex-row items-center border-b border-gray100 py-3">
        <View className='ml-2 flex flex-col'>

            <View className='mb-1 flex flex-row items-center'>
              {highlightKeyword(restKeyword, keyword) }
            </View>

            <View className='flex w-full flex-row justify-between'>
                <Text className="text-sm text-gray600">{address}</Text>
                <Text className="text-sm text-gray600">{distance}m</Text>
            </View>
        </View>
    </View>
  );
};

export default RecommendedSearchComponent;

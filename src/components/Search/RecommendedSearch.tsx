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
  let restKeyword = fullKeyword.replace(/<\/?b>/g, "");

  if (fullKeyword.search(keyword)) {
    restKeyword = restKeyword.replace(keyword, "");
  }
  return (
    <View className="flex flex-row items-center border-b border-gray100 py-3">
        <View className='ml-2 flex flex-col'>

            <View className='mb-1 flex flex-row items-center'>
                {fullKeyword.search(keyword) && <Text className='text-[16px] font-medium text-main'>{keyword}</Text>}
                <Text className='text-[16px] font-medium text-gray800'>{restKeyword}</Text>
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

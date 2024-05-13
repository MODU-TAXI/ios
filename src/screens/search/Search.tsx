import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBoxComponent from '@components/Search/SearchBox';
import RecommendedSearchComponent from '@components/Search/RecommendedSearch';

import { useNaverSearch } from '@hooks/api/search';

import { NaverSearch } from '@type/entity/search';

const SearchScreen = () => {
  /** 검색어 저장 변수 */
  const [keyword, setKeyword] = useState<string>('');
  const { data: items, refetch } = useNaverSearch(keyword);

  useEffect(() => {
    refetch();
  }, [keyword, refetch])

  useEffect(() => {
    console.log(items);
  }, [items])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 flex-1">
        
        {/** 검색창 */}
        <View className="mb-3 mt-4">
          <SearchBoxComponent value={keyword} setValue={setKeyword} />
        </View>

        {/** 추천 검색어 */}
        <View className="flex-1">
          {items && 
          items.map((item, index) => (
            <RecommendedSearchComponent 
              key={index}
              keyword={keyword}
              fullKeyword={item.title}
              address={item.address} 
              distance={500}
            />
          ))}

        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

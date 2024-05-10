import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable, TextInput } from 'react-native';

import SearchBoxComponent from '@components/Search/SearchBox';
import RecommendedSearchComponent from '@components/Search/RecommendedSearch';

const SearchScreen = () => {
  /** 검색어 저장 변수 */
  const [keyword, setKeyword] = useState<string>('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 flex-1">
        
        {/** 검색창 */}
        <View className="mb-3 mt-4">
          <SearchBoxComponent value={keyword} setValue={setKeyword} />
        </View>

        {/** 추천 검색어 */}
        <View className="flex-1">
          <RecommendedSearchComponent 
            keyword='주안역' 
            fullKeyword='주안역 센트리빌' 
            address='인천 미추홀구 주안로 41번길' 
            distance={500}
          />
          <RecommendedSearchComponent 
            keyword='주안역' 
            fullKeyword='주안역 3동 성모마리아 성당' 
            address='인천 미추홀구 주안로 41번길' 
            distance={500}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

import { useRecoilState } from 'recoil';
import { View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBoxComponent from '@components/Search/SearchBox';
import SpotSearchComponent from '@components/Search/SpotSearch';
import RecommendedSearchComponent from '@components/Search/RecommendedSearch';

import { searchKeywordState } from '@recoil/recoil';

import { useNaverSearch } from '@hooks/api/search';

import { deleteTagTitle } from '@utils/search';

import { NaverSearch } from '@type/entity/search';
import { SearchScreenProps } from '@type/param/loginStack';

const SearchScreen = ({ navigation }: SearchScreenProps) => {
  /** 검색어 저장 변수 */
  const [keyword, setKeyword] = useRecoilState<string>(searchKeywordState);
  const { data: items, refetch } = useNaverSearch(keyword);

  useEffect(() => {
    refetch();
  }, [keyword, refetch])

  useEffect(() => {
    console.log(items);
  }, [items])

  /** 선택한 검색어를 전달하며 이동 */
  const toDepartureMapScreen = (
    title: string,
    latitude: number,
    longitude: number,
  ) => {
    navigation.navigate('DepartureMapScreen');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 flex-1">
        
        {/** 검색창 */}
        <View className="mb-3 mt-2">
          <SearchBoxComponent />
        </View>

        {keyword && (
          <SpotSearchComponent spotName={keyword} />
        )}

        {/** 추천 검색어 */}
        <View className="flex-1">
          {items && 
          items.map((item, index) => (
            <Pressable
              onPress={() => toDepartureMapScreen(
                deleteTagTitle(item.title),
                item.mapx,
                item.mapy,
              )}
            >
              <RecommendedSearchComponent 
                key={index}
                keyword={keyword}
                fullKeyword={deleteTagTitle(item.title)}
                address={item.address} 
                distance={500}
              />
            </Pressable>
          ))}

        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

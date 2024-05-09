import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable, TextInput } from 'react-native';

import InputBoxComponent from '@components/InputBox';
import SearchBoxComponent from '@components/SearchBox';
import LatestSearchComponent from '@components/LatestSearch';
import FilterButtonComponent from '@components/RoomDigest/FilterButton';

import ChevronDownSvg from '@assets/images/RoomDigest/ChevronDown.svg';
import MagnifyingGlassMainSvg from '@assets/images/Search/MagnifyingGlassMain.svg';

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

        {/** 최근검색 탭 */}
        <View className="flex flex-row px-1 py-2">
          <Pressable>
            <Text className="pr-4 text-lg font-semibold">최근 검색</Text>
          </Pressable>
          <Pressable>
            <Text className="pr-4 text-lg font-medium text-gray500">
              거점 리스트
            </Text>
          </Pressable>
          <Pressable>
            <Text className="text-lg font-medium text-gray500">즐겨찾기</Text>
          </Pressable>
        </View>

        {/** 시군구 태그, 최신순 */}
        <View className="mb-3 mt-[6.5px] flex flex-row justify-between">
          <View className="flex flex-row">
            <FilterButtonComponent label="서울특별시" />
            <FilterButtonComponent label="강서구" />
            <FilterButtonComponent label="주안역" />
          </View>
          <View className="flex flex-row items-center">
            <Text className="pr-1 text-gray700">최신순</Text>
            <ChevronDownSvg />
          </View>
        </View>

        {/** 최근 검색어 */}
        <View className="flex-1">
          <LatestSearchComponent keyword="가양역 1번 출구" distance={500} />
          <LatestSearchComponent keyword="간재울역 4번 출구" distance={500} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MagnifyingGlassMainSvg from '@assets/images/Search/MagnifyingGlassMain.svg';
import { useNavigation } from '@react-navigation/native';
import SearchBoxComponent from '@components/SearchBox';
import FilterButtonComponent from '@components/RoomDigest/FilterButton';
import ChevronDownSvg from '@assets/images/RoomDigest/ChevronDown.svg';

const SearchScreen = () => {
  const value = '';
  return (
    <SafeAreaView className="flex-1 mx-4">
      <SearchBoxComponent value={value} />
      <View className="flex flex-row py-2 px-1">
        <Pressable>
          <Text className="text-lg pr-4 font-semibold">최근 검색</Text>
        </Pressable>
        <Pressable>
          <Text className="text-lg pr-4 font-medium">거점 리스트</Text>
        </Pressable>
        <Pressable>
          <Text className="text-lg font-medium">즐겨찾기</Text>
        </Pressable>
      </View>
      <View className="flex flex-row justify-between py-[6.5px]">
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
    </SafeAreaView>
  );
};

export default SearchScreen;

import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import MagnifyingGlassMainSvg from '@assets/images/Search/MagnifyingGlassMain.svg';
import { useNavigation } from '@react-navigation/native';

interface SearchBoxProps {
  value: string;
}

/** 검색 바 */
const SearchBoxComponent = ({ value }: SearchBoxProps) => {
  const navigate = useNavigation();
  const goBack = () => {
    navigate.goBack();
  };
  return (
    <View className="flex flex-row items-center h-fit w-auto mt-4 mb-3">
      <View className="flex flex-row flex-1 items-center w-auto p-2 bg-gray100 rounded-xl">
        <View className="px-1">
          <MagnifyingGlassMainSvg></MagnifyingGlassMainSvg>
        </View>
        <TextInput
          className="text-center"
          placeholder="도착지를 검색해주세요"
        ></TextInput>
      </View>
      <Pressable onPress={goBack}>
        <Text className="text-base p-2.5">취소</Text>
      </Pressable>
    </View>
  );
};

export default SearchBoxComponent;

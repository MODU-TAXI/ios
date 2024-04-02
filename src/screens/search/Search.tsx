import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MagnifyingGlassMainSvg from '@assets/images/Search/MagnifyingGlassMain.svg';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const navigate = useNavigation();
  const goBack = () => {
    navigate.goBack();
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <View className="flex flex-row items-center h-fit w-auto m-4">
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
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

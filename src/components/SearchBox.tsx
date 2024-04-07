import React, { useState, useRef } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import MagnifyingGlassMainSvg from '@assets/images/Search/MagnifyingGlassMain.svg';
import { useNavigation } from '@react-navigation/native';

interface SearchBoxProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

/** 검색 바 */
const SearchBoxComponent: React.FC<SearchBoxProps> = ({ value, setValue }) => {
  // focusing ref
  const inputRef = React.useRef<TextInput>(null);

  const navigate = useNavigation();

  // input value onChange 함수
  const valueHandleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setValue(e.nativeEvent.text);
  };

  // 검색창 클릭 시에도 focusing
  const handleFocus = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const goBack = (): void => {
    navigate.goBack();
  };

  return (
    <View className="flex flex-row">
      {/** 검색창 */}
      <Pressable
        onPress={handleFocus}
        className="flex flex-row flex-1 h-full p-2 bg-gray100 rounded-xl"
      >
        <View className="px-1">
          <MagnifyingGlassMainSvg></MagnifyingGlassMainSvg>
        </View>
        <View className="flex-col mb-1 justify-center">
          <TextInput
            ref={inputRef}
            value={value}
            onChange={valueHandleChange}
            className="text-base"
            placeholder="도착지를 검색해주세요"
          />
        </View>
      </Pressable>

      {/** 취소 버튼 */}
      <Pressable onPress={goBack}>
        <Text className="text-base p-2.5">취소</Text>
      </Pressable>
    </View>
  );
};

export default SearchBoxComponent;

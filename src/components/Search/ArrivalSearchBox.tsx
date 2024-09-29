import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  Pressable,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

import MagnifyingGlassMainSvg from '@assets/images/Search/MagnifyingGlassMain.svg';

interface ArrivalSearchBoxProps {
  keyword: string;
  handleKeyword: (input: string) => void;
}

/** 검색 바 */
const ArrivalSearchBoxComponent: React.FC<ArrivalSearchBoxProps> = ({ keyword, handleKeyword }) => {
  // focusing ref
  const inputRef = React.useRef<TextInput>(null);

  const navigate = useNavigation();

  // input value onChange 함수
  const valueHandleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    handleKeyword(e.nativeEvent.text);
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
        className="flex h-full flex-1 flex-row truncate rounded-xl bg-gray100 p-2"
      >
        <View className="flex justify-center px-1">
          <MagnifyingGlassMainSvg></MagnifyingGlassMainSvg>
        </View>
        <View className="mr-8 flex-row justify-center">
          <TextInput
            ref={inputRef}
            value={keyword}
            onChange={valueHandleChange}
            multiline={true}
            numberOfLines={1}
            blurOnSubmit={true}
            className="pt-0 text-base"
            placeholder="도착지를 검색해주세요"
          />
        </View>
      </Pressable>

      {/** 취소 버튼 */}
      <Pressable onPress={goBack}>
        <Text className="p-2.5 text-base">취소</Text>
      </Pressable>
    </View>
  );
};

export default ArrivalSearchBoxComponent;

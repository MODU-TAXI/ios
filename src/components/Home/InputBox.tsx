import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import Search from '@assets/images/Home/Search.svg';

interface InputBoxComponentProps {
  toSearchScreen: () => void;
}

const InputBoxComponent: React.FC<InputBoxComponentProps> = ({ toSearchScreen }) => {
  return (
    <Pressable
      onPress={toSearchScreen}
      className="mt-2 flex flex-row items-center rounded-xl bg-white py-2"
    >
      <Search className="ml-3 mr-1" />

      <View>
        <Text className="text-[16px] text-[#9C9C9C]">오늘 우리 어디로 떠날까요?</Text>
      </View>
    </Pressable>
  );
};

export default InputBoxComponent;

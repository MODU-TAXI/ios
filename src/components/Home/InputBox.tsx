import React from 'react';
import { View, Text, Pressable } from 'react-native';

import Search from '@assets/images/Home/Search.svg';

const InputBoxComponent = () => {
  return (
    <View className="mt-2 flex flex-row items-center rounded-xl bg-white py-2">
      <Search className="ml-3 mr-1" />

      <View>
        <Text className="text-[16px] text-[#9C9C9C]">오늘 우리 어디로 떠날까요?</Text>
      </View>
    </View>
  );
};

export default InputBoxComponent;

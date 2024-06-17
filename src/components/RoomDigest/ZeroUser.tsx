import React from 'react';
import { View, Text } from 'react-native';

import BasicProfile from '@assets/images/Match/BasicProfile.svg';

const ZeroUserComponent = () => {
  return (
    <View className="mt-4 flex-row items-center ">
      <BasicProfile className="mr-1" />
      <Text className="text-[18px] text-[#9C9C9C]">현재 멤버가 없어요</Text>
    </View>
  );
};

export default ZeroUserComponent;

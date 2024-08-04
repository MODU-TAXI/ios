import React from 'react';
import { View, Text } from 'react-native';

import BasicProfile from '@assets/images/Match/BasicProfile.svg';

const ZeroUserComponent = () => {
  return (
    <View className="mt-4 flex-row items-center ">
      <BasicProfile className="mr-2" />
      <Text className="text-[#9C9C9C] text-base">현재 멤버가 없어요</Text>
    </View>
  );
};

export default ZeroUserComponent;

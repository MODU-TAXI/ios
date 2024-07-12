import React from 'react';
import { View, Text } from 'react-native';

import SadFace from '@assets/images/Home/SadFace.svg';
import NoParty from '@assets/images/Home/NoParty.svg';

const NoPartyComponent = () => {
  return (
    <View className="px-4">
      <Text className="text-[18px] font-semibold">내가 참여중인 택시팟</Text>

      <NoParty className="mt-4" />
    </View>
  );
};

export default NoPartyComponent;

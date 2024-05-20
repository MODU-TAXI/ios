import React from 'react';
import { Text, View } from 'react-native';

import ClickedHome from '@assets/images/BottomTab/ClickedHome.svg';
import UnClickedHome from '@assets/images/BottomTab/UnClickedHome.svg';

interface HomeTabComponentProps {
  focused: boolean;
}

const HomeTabComponent: React.FC<HomeTabComponentProps> = ({ focused }) => {
  if (focused) {
    return (
      <View className="flex items-center justify-center">
        <ClickedHome />

        <Text className="mt-1 text-[12px] font-semibold text-main">홈</Text>
      </View>
    );
  }

  return (
    <View className="flex items-center justify-center">
      <UnClickedHome />

      <Text className="mt-1 text-[12px] font-semibold  text-[#AFAFAF]">홈</Text>
    </View>
  );
};

export default HomeTabComponent;

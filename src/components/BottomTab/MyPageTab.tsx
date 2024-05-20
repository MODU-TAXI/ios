import React from 'react';
import { Text, View } from 'react-native';

import ClickedProfile from '@assets/images/BottomTab/ClickedProfile.svg';
import UnClickedProfile from '@assets/images/BottomTab/UnClickedProfile.svg';

interface MyPageTabComponentProps {
  focused: boolean;
}

const MyPageTabComponent: React.FC<MyPageTabComponentProps> = ({ focused }) => {
  if (focused) {
    return (
      <View className="flex items-center justify-center">
        <ClickedProfile />

        <Text className="mt-1 text-[12px] font-semibold text-main">마이페이지</Text>
      </View>
    );
  }

  return (
    <View className="flex items-center justify-center">
      <UnClickedProfile />

      <Text className="mt-1 text-[12px] font-semibold text-[#AFAFAF]">마이페이지</Text>
    </View>
  );
};

export default MyPageTabComponent;

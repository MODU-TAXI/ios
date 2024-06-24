import React from 'react';
import { View, Text, Pressable } from 'react-native';

import InputBoxComponent from './InputBox';

import { User } from '@type/entity/user';

import Logo from '@assets/images/Home/Logo.svg';
import Bell from '@assets/images/Home/Bell.svg';

interface HomeHeaderComponentProps {
  userInfo: User;
  roomId: number;
  toSearchScreen: () => void;
  toAlarmScreen: () => void;
}

const HomeHeaderComponent: React.FC<HomeHeaderComponentProps> = ({
  userInfo,
  roomId,
  toSearchScreen,
  toAlarmScreen,
}) => {
  const roomIn = roomId > 0;

  const topStyle = roomIn
    ? 'flex-col bg-main pt-10 px-4 rounded-b-[18px] pb-[18px]'
    : 'flex-col bg-[#4F4F4F] pt-10 px-4 rounded-b-[18px] pb-[18px]';

  return (
    <View className={topStyle}>
      <View className="mt-6 flex-row items-center justify-between">
        <View>
          <Logo />
        </View>

        <Pressable onPress={toAlarmScreen}>
          <Bell />
        </Pressable>
      </View>

      {/* 이름 */}
      <View className="mt-5 flex-row px-1">
        {roomIn ? (
          <View className="flex-row items-center justify-center">
            <Text className="text-[18px] font-semibold text-white">{userInfo.name}님, </Text>
            <Text className="text-[18px] font-medium text-white">택시 이용중이에요!</Text>
          </View>
        ) : (
          <View className="flex-row items-center justify-center">
            <Text className="text-[18px] font-medium text-white">반가워요, </Text>

            <Text className="text-[18px] font-semibold text-white">{userInfo.name}님!</Text>
          </View>
        )}
      </View>

      {/* 검색 */}
      <InputBoxComponent toSearchScreen={toSearchScreen} />
    </View>
  );
};

export default HomeHeaderComponent;

import React from 'react';
import { View, Text, Pressable } from 'react-native';

import InputBoxComponent from './InputBox';

import { useIsOldiPhone } from '@hooks/device';

import { User } from '@type/entity/user';
import { HomeScreenProps } from '@type/param/loginStack';

import Logo from '@assets/images/Home/Logo.svg';
import Bell from '@assets/images/Home/Bell.svg';

interface HomeHeaderComponentProps {
  userInfo: User;
  roomId: number;
  toMapScreen: () => void;
  toAlarmScreen: () => void;
  alarmsCount: number | undefined;
  navigation: HomeScreenProps['navigation'];
}

const HomeHeaderComponent: React.FC<HomeHeaderComponentProps> = ({
  userInfo,
  roomId,
  toMapScreen,
  toAlarmScreen,
  alarmsCount,
  navigation,
}) => {
  const isOldiPhone = useIsOldiPhone();

  const blocked = userInfo.blocked;

  const roomIn = roomId > 0;

  const topStyle = blocked
    ? isOldiPhone
      ? 'flex-col bg-[#F34343] px-4 pt-2 rounded-b-[18px] pb-[18px] shadow-md'
      : 'flex-col bg-[#F34343] pt-10 px-4 rounded-b-[18px] pb-[18px] shadow-md'
    : roomIn
      ? isOldiPhone
        ? 'flex-col bg-main px-4 pt-2 rounded-b-[18px] pb-[18px] shadow-md'
        : 'flex-col bg-main pt-10 px-4 rounded-b-[18px] pb-[18px] shadow-md'
      : isOldiPhone
        ? 'flex-col bg-[#4F4F4F] pt-2 px-4 rounded-b-[18px] pb-[18px] shadow-md'
        : 'flex-col bg-[#4F4F4F] pt-10 px-4 rounded-b-[18px] pb-[18px] shadow-md';

  const toSearchScreen = () => {
    navigation.navigate('HomeSearchScreen', { toMainMap: toMapScreen });
  };

  return (
    <View className={topStyle}>
      <View className="mt-3 flex-row items-center justify-between">
        <View>
          <Logo />
        </View>

        <Pressable onPress={toAlarmScreen}>
          {alarmsCount && alarmsCount > 0 ? (
            <View className="absolute right-1 top-0 z-10 h-[18px]   w-[18px] items-center justify-center rounded-full bg-[#FF4949]">
              <Text className="text-[12px] font-medium tracking-tight text-white">
                {alarmsCount}
              </Text>
            </View>
          ) : null}

          <Bell />
        </Pressable>
      </View>

      {/* 이름 */}
      <View className={isOldiPhone ? `mt-2 flex-row` : `mt-5 flex-row`}>
        {blocked ? (
          <View className="flex-row items-center justify-center">
            <Text className="text-[18px] font-semibold text-white">{userInfo.nickname}님,</Text>
            <Text className="text-[18px] font-medium text-white">현재 이용정지 상태입니다.</Text>
          </View>
        ) : roomIn ? (
          <View className="flex-row items-center justify-center">
            <Text className="text-[18px] font-semibold text-white">{userInfo.nickname}님, </Text>
            <Text className="text-[18px] font-medium text-white">택시 이용중이에요!</Text>
          </View>
        ) : (
          <View className="flex-row items-center justify-center">
            <Text className="text-[18px] font-medium text-white">반가워요, </Text>

            <Text className="text-[18px] font-semibold text-white">{userInfo.nickname}님!</Text>
          </View>
        )}
      </View>

      {/* 검색 */}
      <Pressable onPress={toSearchScreen}>
        <InputBoxComponent />
      </Pressable>
    </View>
  );
};

export default HomeHeaderComponent;

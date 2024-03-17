import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import TextSvg from '../../assets/images/tray.fill.svg';
import ButtonComponent from '@components/Button';

const AuthenticationScreen = () => {
  const toNext = async (): Promise<void> => {
    return;
  };

  return (
    <SafeAreaView className="flex-1">
      {/* 맨 상단 안내 메세지*/}
      <View className="flex items-center">
        <Text className="text-xl">앱 서비스 접근 권한 안내</Text>
        <Text className="text-slate-500 text-center">
          권한을 허용하지 않아도 모두의 택시를 이용할 수 있지만
        </Text>
        <Text className="text-slate-500 text-center">
          일부 서비스가 제한될 수 있어요
        </Text>
      </View>

      {/* 권한 확인 목록들 */}
      <View className="flex-1 justify-center">
        <View className="flex-row justify-center items-center my-3">
          <View className="flex justify-center items-center w-10 h-10 rounded-full bg-basic">
            <TextSvg />
          </View>

          <View className="flex mx-3">
            <Text className="text-lg font-bold">기기 및 앱 기록</Text>
            <Text className="text-lg ">서비스 개선 및 오류 확인</Text>
          </View>
        </View>

        <View className="flex-row justify-center items-center my-3">
          <View className="flex justify-center items-center w-10 h-10 rounded-full bg-basic">
            <TextSvg />
          </View>

          <View className="flex mx-3">
            <Text className="text-lg font-bold">기기 및 앱 기록</Text>
            <Text className="text-lg ">서비스 개선 및 오류 확인</Text>
          </View>
        </View>

        <View className="flex-row justify-center items-center my-3">
          <View className="flex justify-center items-center w-10 h-10 rounded-full bg-basic">
            <TextSvg />
          </View>

          <View className="flex mx-3">
            <Text className="text-lg font-bold">기기 및 앱 기록</Text>
            <Text className="text-lg ">서비스 개선 및 오류 확인</Text>
          </View>
        </View>

        <View className="flex-row justify-center items-center my-3">
          <View className="flex justify-center items-center w-10 h-10 rounded-full bg-basic">
            <TextSvg />
          </View>

          <View className="flex mx-3">
            <Text className="text-lg font-bold">기기 및 앱 기록</Text>
            <Text className="text-lg ">서비스 개선 및 오류 확인</Text>
          </View>
        </View>
      </View>

      <ButtonComponent
        color={'black'}
        text={'확인'}
        textColor={'white'}
        onPress={toNext}
      />
    </SafeAreaView>
  );
};

export default AuthenticationScreen;

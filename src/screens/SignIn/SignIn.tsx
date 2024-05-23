import React from 'react';
import { Text, View, Linking, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useKakaoLogin } from '@hooks/api/member';

import { SignInScreenProps } from '@type/param/rootStack';

import AppleLogo from '@assets/images/SignIn/AppleLogo.svg';
import KakaoLogo from '@assets/images/SignIn/KakaoLogo.svg';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { mutateAsync: kakaoLogin } = useKakaoLogin(navigation);

  const appleLogin = async (): Promise<void> => {
    await Linking.openURL('modutaxi://main');

    // navigation.navigate('CheckPermissionScreen');
  };

  return (
    <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
      <View className="mx-6 flex-1">
        {/* 모두의 택시 로고*/}
        <View className="flex-1 items-center justify-center">
          <Text className="text-5xl">모두의 택시</Text>
        </View>

        {/* 모두의 택시 이미지 */}
        <View className="my-4 w-full flex-1 items-center justify-center bg-black">
          <Text className="text-white">모택 이미지</Text>
        </View>

        {/* 카카오 로그인 버튼 */}
        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row items-center rounded-[61px] bg-kakaoyellow px-[96px] py-[14px]"
            onPress={() => kakaoLogin()}
          >
            <KakaoLogo className="mr-1" />
            <Text className="ml-1 text-center font-semibold text-base text-black">
              카카오 로그인
            </Text>
          </Pressable>
        </View>

        {/* 애플 로그인 버튼 */}
        <View className="mx-3 mb-11">
          <Pressable
            className="flex-row items-center rounded-[61px] bg-black px-[96px] py-[14px]"
            onPress={appleLogin}
          >
            <AppleLogo className="mr-1" />
            <Text className="ml-1 text-center font-semibold text-base text-white">애플 로그인</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

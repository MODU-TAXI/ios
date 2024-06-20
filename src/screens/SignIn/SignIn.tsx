import React from 'react';
import { Text, View, Linking, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { useKakaoLogin } from '@hooks/api/member';

import { SignInScreenProps } from '@type/param/rootStack';

import AppleLogo from '@assets/images/SignIn/AppleLogo.svg';
import KakaoLogo from '@assets/images/SignIn/KakaoLogo.svg';
import ModutaxiLogo from '@assets/images/SignIn/ModutaxiLogo.svg';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { mutateAsync: kakaoLogin, isPending: kakaoLoginPending } = useKakaoLogin(navigation);

  const appleLogin = async (): Promise<void> => {
    await Linking.openURL('modutaxi://main');

    // navigation.navigate('CheckPermissionScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {kakaoLoginPending && <TransparentLoadingComponent />}

      <View className="mx-8 flex flex-1 items-center justify-between">
        <View />

        {/** 모두의 택시 로고 */}
        <View className="flex items-center justify-center">
          <Text className="mb-2.5 font-semibold text-base text-gray700">내가 있는 모든 곳이 정거장이 된다!</Text>
          <ModutaxiLogo height={30}/>
        </View>

        {/** 로그인 버튼 */}
        <View className="flex w-full">
          
          {/* 카카오 로그인 버튼 */}
          <View className="mb-3">
            <Pressable
              className="flex-row items-center justify-center rounded-full bg-kakaoyellow py-4"
              onPress={() => kakaoLogin()}
            >
              <KakaoLogo className="mr-2 h-[18px] w-[18px]" />
              <Text className="text-center font-semibold text-base text-black">
                카카오톡으로 계속하기
              </Text>
            </Pressable>
          </View>

          {/* 애플 로그인 버튼 */}
          <View className="mb-12">
            <Pressable
              className="flex-row items-center justify-center rounded-full bg-black py-4"
              onPress={appleLogin}
            >
              <AppleLogo className="mr-2 h-[18px] w-[18px]" />
              <Text className="text-center font-semibold text-base text-white">
                Apple로 계속하기
              </Text>
            </Pressable>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

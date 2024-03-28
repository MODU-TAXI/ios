import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { login } from '@react-native-seoul/kakao-login';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import ButtonComponent from '@components/Button';
import { RootStackParamList } from '@type/ParamLists';
import { socialLoginApi } from '@api/api';

type KakaoLoginResponse = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  scopes: string[];
};

const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // kakao sdk에서 kakaoToken을 받아오는 함수
  const kakaoLogin = async (): Promise<void> => {
    try {
      const kakaoLoginResponse: KakaoLoginResponse = await login();

      const { accessToken } = kakaoLoginResponse;

      await socialLoginApi('KAKAO', {
        accessToken: accessToken,
      });
    } catch (err) {
      // TODO: 취소 에러시에 다른 조치 취해주기
      console.error('login err', err);
    }
  };

  const appleLogin = async (): Promise<void> => {
    navigation.navigate('CheckPermissionScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mx-6">
        {/* 모두의 택시 로고*/}
        <View className="flex-1 justify-center items-center">
          <Text className="text-5xl">모두의 택시</Text>
        </View>

        {/* 모두의 택시 이미지 */}
        <View className="flex-1 w-full my-4 bg-black justify-center items-center">
          <Text className="text-white">모택 이미지</Text>
        </View>

        {/* 카카오 로그인 버튼 */}
        <View className="mx-3 mb-4">
          <ButtonComponent
            color={'bg-kakaoyellow'}
            text={'카카오 로그인'}
            textColor={'black'}
            onPress={kakaoLogin}
            disabled={false}
          />
        </View>

        {/* 애플 로그인 버튼 */}
        <View className="mx-3 mb-11">
          <ButtonComponent
            color={'bg-black'}
            text={'애플 로그인'}
            textColor={'white'}
            onPress={appleLogin}
            disabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

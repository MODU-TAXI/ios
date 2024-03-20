import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { login } from '@react-native-seoul/kakao-login';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import ButtonComponent from '@components/Button';
import { RootStackParamList } from '../../types/ParamLists';

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

  const [result, setResult] = useState<string>('');

  const kakaoLogin = async (): Promise<void> => {
    try {
      const token: KakaoLoginResponse = await login();

      setResult(JSON.stringify(token));
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
      <View className="flex-1 mx-12">
        {/* 모두의 택시 로고*/}
        <View className="flex-1 justify-center items-center">
          <Text className="text-5xl">모두의 택시</Text>
        </View>
        <View className="flex-1 justify-center items-center">
          {/* 모두의 택시 이미지 */}
          <View className="flex-1 w-full bg-black justify-center items-center">
            <Text className="text-white">모택 이미지</Text>
          </View>

          {/* 카카오 로그인 버튼 */}
          <ButtonComponent
            color={'kakaoyellow'}
            text={'카카오 로그인'}
            textColor={'black'}
            onPress={kakaoLogin}
          />

          {/* 애플 로그인 버튼 */}
          <ButtonComponent
            color={'black'}
            text={'애플 로그인'}
            textColor={'white'}
            onPress={appleLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

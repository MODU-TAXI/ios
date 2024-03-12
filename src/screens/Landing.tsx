import React, { useState } from 'react';

import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { login } from '@react-native-seoul/kakao-login';

type KakaoLoginResponse = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  scopes: string[];
};

const LandingScreen = () => {
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

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Pressable
          className="bg-[#FEE500] p-4 rounded-[12px]"
          onPress={() => {
            kakaoLogin();
          }}
        >
          <Text className="text-black">카카오 로그인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;

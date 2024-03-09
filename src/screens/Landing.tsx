import React, { useState } from 'react';

import { Pressable, Text, View } from 'react-native';

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
      console.error('login err', err);
    }
  };

  return (
    <View className="flex justify-center align-middle">
      <Pressable
        className="bg-[#FEE500] p-4 rounded-[12px]"
        onPress={() => {
          kakaoLogin();
        }}
      >
        <Text className="text-[40px]">카카오 로그인</Text>
      </Pressable>
    </View>
  );
};

export default LandingScreen;

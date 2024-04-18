import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useKakaoLogin } from '@hooks/api/member';
import { RootStackParamList } from '@type/ParamLists';

import KakaoLogo from '@assets/images/SignIn/KakaoLogo.svg';
import AppleLogo from '@assets/images/SignIn/AppleLogo.svg';

const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { mutateAsync: kakaoLogin } = useKakaoLogin();

  const appleLogin = async (): Promise<void> => {
    navigation.navigate('CheckPermissionScreen');
  };

  return (
    <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
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
          <Pressable
            className="flex-row items-center bg-kakaoyellow px-[96px] py-[14px] rounded-[61px]"
            onPress={() => kakaoLogin()}
          >
            <KakaoLogo className="mr-1" />
            <Text className="ml-1 font-semibold text-base text-black text-center">
              카카오 로그인
            </Text>
          </Pressable>
        </View>

        {/* 애플 로그인 버튼 */}
        <View className="mx-3 mb-11">
          <Pressable
            className="flex-row items-center bg-black px-[96px] py-[14px] rounded-[61px]"
            onPress={appleLogin}
          >
            <AppleLogo className="mr-1" />
            <Text className="ml-1 font-semibold text-base text-white text-center">
              애플 로그인
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

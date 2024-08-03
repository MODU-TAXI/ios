import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { loggedInState } from '@recoil/recoil';

import { LoginStackParamList } from '@type/param/loginStack';

import Reload from '@assets/images/Common/Reload.svg';
import ModutaxiCar from '@assets/images/SignUp/ModutaxiCar.svg';

// error-boundary까지 온 에러들 분기 처리
const ErrorFallback = ({
  error,
  resetErrorBoundary,
  navigation,
}: {
  error: any;
  resetErrorBoundary: () => void;
  navigation: NavigationProp<LoginStackParamList>;
}) => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  // 토큰 관련 에러 -> 모두 로그아웃 처리
  if (error.code === 'TOKEN_ERROR') {
    setLoggedIn(false);

    Alert.alert('로그아웃 되었습니다.');
  }

  const errorCode = error?.response?.data?.code;

  useEffect(() => {
    // 존재하지 않는 것들에 대한 에러 처리 -> mainScreen 이동
    if (errorCode === 'ROOM_001') {
      Alert.alert(
        '에러',
        '종료된 매칭입니다.',
        [
          {
            text: '확인',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainScreen' }],
              }),
          },
        ],
        { cancelable: false },
      );
    }
  }, [errorCode, navigation]);

  // 나머지는 재시도 화면 보여주기
  return (
    <SafeAreaView className="flex-1">
      <View className="mb-14 mt-28 flex-1 flex-col items-center justify-between">
        <View>
          <Text className="mt-8 text-[18px] font-semibold tracking-tight text-[#1F1F1F]">
            화면을 불러오지 못했어요
          </Text>

          <Pressable
            onPress={resetErrorBoundary}
            className="mt-4 flex-row items-center justify-center rounded-3xl bg-main px-6 py-4"
          >
            <Reload className="mr-1" />
            <Text className="font-semibold tracking-tight text-white">다시 시도하기</Text>
          </Pressable>
        </View>

        <View className="items-center justify-center">
          <ModutaxiCar />
        </View>
      </View>
    </SafeAreaView>
  );
};

const SuspenseErrorHandler = ({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: any;
}) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      FallbackComponent={(props) => <ErrorFallback {...props} navigation={navigation} />}
      onReset={reset}
    >
      {children}
    </ErrorBoundary>
  );
};

export default SuspenseErrorHandler;

import React from 'react';
import { useRecoilState } from 'recoil';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';
import ProgressBarComponent from '@components/ProgressBar';

import { loggedInState } from '@recoil/recoil';

import ModutaxiCar from '@assets/images/SignUp/ModutaxiCar.svg';

const CompleteSignUpScreen = () => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const toNext = async (): Promise<void> => {
    setLoggedIn(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 진행사항 progressBar */}
      <View className="mt-[11px] h-1">
        <ProgressBarComponent previousDealt={0} dealt={120} />
      </View>

      <View className="mx-6 flex-1">
        {/* 설명 */}
        <View className="mt-14 flex">
          <Text className="text-xl font-bold tracking-tight text-main">가입완료!</Text>
          <Text className="text-xl font-bold tracking-tight">지금바로 탑승하러 가볼까요?</Text>
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

        <View className="items-center justify-center">
          <ModutaxiCar />
        </View>

        {/* 확인 버튼 */}
        <View className="mx-3 mb-10 mt-6">
          <ButtonComponent
            color={'bg-main'}
            borderColor={'border-main'}
            text={'모두의택시 바로가기'}
            textColor={'white'}
            onPress={toNext}
            disabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompleteSignUpScreen;

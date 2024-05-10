import React from 'react';
import { useRecoilState } from 'recoil';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';
import ProgressBarComponent from '@components/ProgressBar';

import { loggedInState } from '@recoil/recoil';

const CompleteSignUpScreen = () => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const toNext = async (): Promise<void> => {
    setLoggedIn(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 진행사항 progressBar */}
      <View className="mt-[11px] h-1">
        <ProgressBarComponent previousDealt={0} dealt={100} />
      </View>

      <View className="mx-6 flex-1">
        {/* 설명 */}
        <View className="mt-14 flex">
          <Text className="text-xl font-bold">가입완료!</Text>
          <Text className="text-xl font-bold">지금바로 탑승하러 가볼까요?</Text>
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

        {/* 확인 버튼 */}
        <View className="mx-3 mb-11">
          <ButtonComponent
            color={'bg-black'}
            borderColor={'border-black'}
            text={'확인'}
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

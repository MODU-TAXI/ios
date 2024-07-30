import React from 'react';
import { useRecoilValue } from 'recoil';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';

import { userInfoState } from '@recoil/recoil';

import { useIsOldiPhone } from '@hooks/device';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { WithdrawCheckScreenProps } from '@type/param/loginStack';

const WithdrawCheckScreen = ({ navigation }: WithdrawCheckScreenProps) => {
  useDeleteAllNotifee();

  const myInfo = useRecoilValue(userInfoState);
  const isOldiPhone = useIsOldiPhone();

  const toWithdrawSurveyScreen = () => {
    navigation.navigate('WithdrawSurveyScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <HeaderComponent title="회원탈퇴" />

      <View className="mt-8 flex-1 px-6">
        <View>
          <Text className="text-[18px] font-semibold tracking-tight text-[#1F1F1F]">
            {myInfo.nickname}님,
          </Text>

          <Text className="mt-1 text-[18px] font-semibold tracking-tight text-[#1F1F1F]">
            잠시만요!
          </Text>
        </View>

        <View className="mt-4">
          <Text className="font-medium tracking-tight text-[#FF4949]">모두의 택시를 탈퇴하면,</Text>
        </View>

        <View className="mt-4">
          <Text className="text-[12px] font-medium tracking-tight text-[#5D5D5D]">
            • [{myInfo.nickname}]님의 데이터는 비활성화 후 30일 동안 보관돼요
          </Text>

          <View className="mt-4 flex-row">
            <Text className="text-[12px] font-medium tracking-tight text-[#5D5D5D]">• </Text>
            <Text className="text-[12px] font-medium tracking-tight text-[#5D5D5D]">
              30일이 지나기 전까지는 언제든지 로그인해서 계정을 활성화할 수 있어요
            </Text>
          </View>

          <Text className="mt-4 text-[12px] font-medium tracking-tight text-[#5D5D5D]">
            • 30일이 지나면 모두의 택시에서 이용했던 모든 기록이 사라져요
          </Text>
        </View>
      </View>

      <View className={`px-9 ${isOldiPhone && 'mb-4'}`}>
        <ButtonComponent
          color={'bg-main'}
          borderColor={'border-main'}
          textColor={'white'}
          text={'확인'}
          disabled={false}
          onPress={toWithdrawSurveyScreen}
        />
      </View>
    </SafeAreaView>
  );
};

export default WithdrawCheckScreen;

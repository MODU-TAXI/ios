import React from 'react';
import { useRecoilState } from 'recoil';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';

import { loggedInState } from '@recoil/recoil';

import { useIsOldiPhone } from '@hooks/device';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { WithdrawCompleteScreenProps } from '@type/param/loginStack';

const WithdrawCompleteScreen = ({ navigation }: WithdrawCompleteScreenProps) => {
  useDeleteAllNotifee();

  const [, setLoggedIn] = useRecoilState(loggedInState);
  const isOldiPhone = useIsOldiPhone();

  // 회원탈퇴
  const withdrawComplete = async () => {
    setLoggedIn(false);
  };

  return (
    <SafeAreaView className="flex-1  bg-white">
      <View className="flex-1 items-center justify-center">
        <Image source={require('../../assets/images/Common/Complete.gif')} />

        <Text className="text-[20px] font-semibold tracking-tight text-[#3E3E3E]">
          탈퇴가 완료되었습니다.
        </Text>
      </View>

      <View className={`px-9 ${isOldiPhone && 'mb-4'}`}>
        <ButtonComponent
          color={'bg-main'}
          borderColor={'border-main'}
          textColor={'white'}
          text={'확인'}
          disabled={false}
          onPress={withdrawComplete}
        />
      </View>
    </SafeAreaView>
  );
};

export default WithdrawCompleteScreen;

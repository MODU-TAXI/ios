import React from 'react';
import { useRecoilState } from 'recoil';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';

import { IsLoggedInRecoil } from '@recoil/type';
import { isLoggedInRecoilState } from '@recoil/recoil';

import { useIsOldiPhone } from '@hooks/device';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { WithdrawCompleteScreenProps } from '@type/param/loginStack';

import Complete from '@assets/images/Common/Complete.svg';

const WithdrawCompleteScreen = ({ navigation }: WithdrawCompleteScreenProps) => {
  useDeleteAllNotifee();

  const [, setIsLoggedInRecoil] = useRecoilState<IsLoggedInRecoil>(isLoggedInRecoilState);

  const isOldiPhone = useIsOldiPhone();

  // 회원탈퇴
  const withdrawComplete = async () => {
    setIsLoggedInRecoil(false);
  };

  return (
    <SafeAreaView className="flex-1  bg-white">
      <View className="flex-1 items-center justify-center">
        <Complete />

        <Text className="mt-2 text-[20px] font-semibold tracking-tight text-[#3E3E3E]">
          탈퇴가 완료되었습니다.
        </Text>
      </View>

      <View className={`px-9 ${isOldiPhone && 'mb-4'} `}>
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

import React from 'react';
import { useRecoilState } from 'recoil';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';

import { loggedInState } from '@recoil/recoil';

import { deleteToken } from '@utils/token';

import { WithdrawCompleteScreenProps } from '@type/param/loginStack';

const WithdrawCompleteScreen = ({ navigation }: WithdrawCompleteScreenProps) => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  // 회원탈퇴
  const withdraw = async () => {
    await deleteToken();
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

      <View className="px-6">
        <ButtonComponent
          color={'bg-main'}
          borderColor={'border-main'}
          textColor={'white'}
          text={'확인'}
          disabled={false}
          onPress={withdraw}
        />
      </View>
    </SafeAreaView>
  );
};

export default WithdrawCompleteScreen;

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { userInfoState } from '@recoil/recoil';

import { useIsOldiPhone } from '@hooks/device';
import { useDeleteMember } from '@hooks/api/member';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { deleteToken } from '@utils/token';

import { WithdrawLastScreenProps } from '@type/param/loginStack';

const WithdrawLastScreen = ({ navigation }: WithdrawLastScreenProps) => {
  useDeleteAllNotifee();

  const myInfo = useRecoilValue(userInfoState);
  const isOldiPhone = useIsOldiPhone();

  const { mutateAsync: deleteMemberMutate, isPending: deleteMemberPending } = useDeleteMember();

  const toWithdrawCompleteScreen = async () => {
    await deleteMemberMutate();
    await deleteToken();
    navigation.navigate('WithdrawCompleteScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      {deleteMemberPending && <TransparentLoadingComponent />}

      <HeaderComponent title="회원탈퇴" />

      <View className="mt-8 flex-1 px-6">
        <View>
          <Text className="text-[18px] font-semibold tracking-tight text-[#1F1F1F]">
            모두의 택시를
          </Text>

          <Text className="mt-1 text-[18px] font-semibold tracking-tight text-[#1F1F1F]">
            이용해주셔서 정말 감사합니다
          </Text>
        </View>

        <View className="mt-4">
          <View className="flex-col">
            <Text className="text-[12px] font-medium tracking-tight text-[#7C7C7C]">
              모두의 택시는 즐거운 택시 동행 문화를 만들어가고 있어요
            </Text>
            <Text className="text-[12px] font-medium tracking-tight text-[#7C7C7C]">
              지금까지 모두의 택시와 함께해주셔서 감사드려요
            </Text>
          </View>

          <View className="mt-4 flex-col">
            <Text className="text-[12px] font-medium tracking-tight text-[#7C7C7C]">
              다음에 다시 만날 때 더 좋은 서비스가 되어
            </Text>
            <Text className="text-[12px] font-medium tracking-tight text-[#7C7C7C]">
              {myInfo.nickname}을 맞이할게요
            </Text>
          </View>

          <Text className="mt-4 text-[12px] font-medium tracking-tight text-[#7C7C7C]">
            {myInfo.nickname}님, 그간 모두의 택시와 함께해주셔서 감사해요
          </Text>
        </View>
      </View>

      <View className={`px-6 ${isOldiPhone && "mb-4"}`}>
        <ButtonComponent
          color={'bg-main'}
          borderColor={'border-main'}
          textColor={'white'}
          text={'회원 탈퇴하기'}
          disabled={false}
          onPress={toWithdrawCompleteScreen}
        />
      </View>
    </SafeAreaView>
  );
};

export default WithdrawLastScreen;

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Text, View, Pressable } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import { GetBankComponent } from '@components/Calculate/GetBank';
import ParticipateMembersComponent from '@components/Calculate/ParicipateMembers';

import { calculateState } from '@recoil/recoil';

import { InfoToastMessage } from '@utils/toastMessage';

import { CheckCalculateScreenProps } from '@type/param/loginStack';

import CopyButton from '@assets/images/Calculate/CopyButton.svg';

const CheckCalculateScreen = ({ navigation }: CheckCalculateScreenProps) => {
  const calculateData = useRecoilValue(calculateState);

  const amount = parseInt(calculateData.amount);
  const amountPerPerson = parseInt(calculateData.amount) / calculateData.users.length;

  const toNext = () => {
    console.log('next!');
  };

  const copyAccount = () => {
    Clipboard.setString(calculateData.account);

    InfoToastMessage('계좌번호가 복사되었습니다.');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="도착완료 정산하기" />
      <View className="flex-1 px-4 pt-8">
        <View className="flex-1 px-3 ">
          {/* 글씨 */}
          <View className="flex-col">
            <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">
              정산 내용을 정확히
            </Text>
            <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">
              확인해주세요!
            </Text>
          </View>

          {/* 계좌번호 */}
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="font-medium tracking-tight text-[#5D5D5D]">계좌번호</Text>

            <View className="flex-row items-center">
              <GetBankComponent bank={calculateData.bank} />
              <Text className="ml-2 mr-1 text-[16px] font-medium tracking-tight">
                {calculateData.bank}
              </Text>
              <Text className="text-[16px] font-medium tracking-tight">
                {calculateData.account}
              </Text>

              <Pressable onPress={copyAccount}>
                <CopyButton />
              </Pressable>
            </View>
          </View>

          {/* 총 금액 */}
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="font-medium tracking-tight text-[#5D5D5D]">총금액</Text>

            <Text className="font-medium tracking-tight text-[#1F1F1F]">
              {amount.toLocaleString('ko-KR')}원
            </Text>
          </View>

          {/* 한명당 내야할 금액 */}
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="font-medium tracking-tight text-[#5D5D5D]">한 명당 내야할 금액</Text>

            <Text className="font-medium tracking-tight text-main">
              {amountPerPerson.toLocaleString('ko-KR')}원
            </Text>
          </View>

          <View className="my-6 border-[0.5px] border-[#D7D7D7]" />

          {/* 정산 멤버 */}
          <ParticipateMembersComponent participateMembers={calculateData.users} price={amount} />

          <View className="mb-4 px-3">
            <ButtonComponent
              color={'bg-main'}
              borderColor={'border-main'}
              textColor={'white'}
              text={'확인'}
              disabled={false}
              onPress={toNext}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckCalculateScreen;

import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/Calculate/InputBox';
import BankModalComponent from '@components/Calculate/BankModal';

import { AccountScreenProps } from '@type/param/loginStack';

import SelectBank from '@assets/images/Calculate/SelectBank.svg';

const AccountScreen = ({ navigation }: AccountScreenProps) => {
  const [account, setAccount] = useState<string>(''); // 계좌번호
  const [bankModalIndex, setBankModalIndex] = useState<number>(0); // modal index

  // bank modal 열기
  const openBankModal = () => {
    setBankModalIndex(1);
  };

  // bank modal 닫기
  const closeBankModal = (index: number) => {
    setBankModalIndex(index);
  };

  const toNext = () => {
    console.log('next!');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="도착완료 정산하기" />
      <View className="flex-1 px-4 pt-8">
        <View className="flex-1 px-3">
          {/* 글씨 */}
          <View className="flex-col">
            <Text className="text-xl font-bold tracking-tight">정산받을</Text>
            <Text className="text-xl font-bold tracking-tight">계좌번호를 알려주세요!</Text>
          </View>

          {/* 입력창 */}
          <View className="mt-4">
            <InputBoxComponent
              value={account}
              setValue={setAccount}
              error={false}
              placeholder="계좌번호를 입력해주세요"
            />
          </View>

          <View className="mt-2 flex-row justify-end px-2">
            <Pressable onPress={openBankModal}>
              <SelectBank />
            </Pressable>
          </View>
        </View>

        <View className="mb-4 px-3">
          <ButtonComponent
            color={'bg-main'}
            borderColor={'border-main'}
            textColor={'white'}
            text={'확인'}
            disabled={!account}
            onPress={toNext}
          />
        </View>
      </View>

      <BankModalComponent bankModalIndex={bankModalIndex} closeBankModal={closeBankModal} />
    </SafeAreaView>
  );
};

export default AccountScreen;

import { useRecoilState } from 'recoil';
import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/Calculate/InputBox';
import BankModalComponent from '@components/Calculate/BankModal';
import { GetBankComponent } from '@components/Calculate/GetBank';

import { calculateState } from '@recoil/recoil';

import { AccountScreenProps } from '@type/param/loginStack';

import SelectBank from '@assets/images/Calculate/SelectBank.svg';

const AccountScreen = ({ navigation }: AccountScreenProps) => {
  const [, setCalculate] = useRecoilState(calculateState);
  const [account, setAccount] = useState<string>(''); // 계좌번호
  const [bank, setBank] = useState<string>(''); // 은행
  const [bankModalIndex, setBankModalIndex] = useState<number>(1); // modal index

  // bank modal 열기
  const openBankModal = () => {
    setBankModalIndex(1);
  };

  // bank modal 닫기
  const closeBankModal = (index: number) => {
    setBankModalIndex(index);
  };

  const toNext = () => {
    setCalculate((prev) => ({
      ...prev,
      account: account,
      bank: bank,
    }));

    navigation.navigate('CheckAccountScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="도착완료 정산하기" />
      <View className="flex-1 px-4 pt-8">
        <View className="flex-1 px-3">
          {/* 글씨 */}
          <View className="flex-col">
            <Text className="text-xl font-semibold tracking-tight">정산받을</Text>
            <Text className="text-xl font-semibold tracking-tight">계좌번호를 알려주세요!</Text>
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

          <View className="mt-2 flex-row justify-between px-2">
            <View className="flex-row items-center">
              <GetBankComponent bank={bank} />
              <Text className="ml-1 font-medium tracking-tight">{bank}</Text>
            </View>

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
            disabled={!account || !bank}
            onPress={toNext}
          />
        </View>
      </View>

      <BankModalComponent
        bankModalIndex={bankModalIndex}
        closeBankModal={closeBankModal}
        setBank={setBank}
      />
    </SafeAreaView>
  );
};

export default AccountScreen;

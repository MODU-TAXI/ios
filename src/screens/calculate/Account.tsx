import { useRecoilState } from 'recoil';
import React, { Suspense, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import LoadingComponent from '@components/Common/Loading';
import InputBoxComponent from '@components/Calculate/InputBox';
import BankModalComponent from '@components/Calculate/BankModal';
import { GetBankComponent } from '@components/Calculate/GetBank';
import MyAccountsComponent from '@components/Calculate/MyAccounts';

import { calculateState } from '@recoil/recoil';

import SuspenseErrorHandler from '@server/errorHandler/suspenseErrorHandler';

import { useGetAccounts } from '@hooks/api/account';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { Bank } from '@type/entity/account';
import { AccountScreenProps } from '@type/param/loginStack';

import SelectBank from '@assets/images/Calculate/SelectBank.svg';

const AccountComponent = ({ navigation, route }: AccountScreenProps) => {
  useDeleteAllNotifee();

  const { roomPreview } = route.params;

  const { accounts } = useGetAccounts(); // 계좌 정보들 가져오기

  const [, setCalculateData] = useRecoilState(calculateState);
  const [account, setAccount] = useState<string>(''); // 계좌번호
  const [bank, setBank] = useState<Bank>({ identifier: '', name: '' }); // 은행
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
    setCalculateData((prev) => ({
      ...prev,
      account: account,
      bank: bank,
    }));

    navigation.navigate('CheckAccountScreen', { roomPreview: roomPreview });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="도착완료 정산하기" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                <GetBankComponent bank={bank.identifier} />
                <Text className="ml-1 font-medium tracking-tight">{bank.name}</Text>
              </View>

              <Pressable onPress={openBankModal}>
                <SelectBank />
              </Pressable>
            </View>

            <MyAccountsComponent
              accounts={accounts.accounts}
              setAccount={setAccount}
              setBank={setBank}
            />
          </View>

          <View className="mb-4 px-3">
            <ButtonComponent
              color={'bg-main'}
              borderColor={'border-main'}
              textColor={'white'}
              text={'확인'}
              disabled={!account || !bank.name}
              onPress={toNext}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <BankModalComponent
        bankModalIndex={bankModalIndex}
        closeBankModal={closeBankModal}
        setBank={setBank}
      />
    </SafeAreaView>
  );
};

const AccountScreen = ({ route, navigation }: AccountScreenProps) => {
  return (
    <SuspenseErrorHandler navigation={navigation}>
      <Suspense fallback={<LoadingComponent />}>
        <AccountComponent navigation={navigation} route={route} />
      </Suspense>
    </SuspenseErrorHandler>
  );
};

export default AccountScreen;

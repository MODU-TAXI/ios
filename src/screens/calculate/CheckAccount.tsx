import React from 'react';
import { Text, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import { GetBankComponent } from '@components/Calculate/GetBank';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { calculateState } from '@recoil/recoil';

import { useRegisterAccount } from '@hooks/api/account';

import { CheckAccountScreenProps } from '@type/param/loginStack';

const CheckAccountScreen = ({ navigation, route }: CheckAccountScreenProps) => {
  const { roomPreview } = route.params;

  const [calculateData, setCalculateData] = useRecoilState(calculateState);

  const { mutateAsync: registerAccount, isPending: registerAccountPending } = useRegisterAccount();

  const toNext = async () => {
    const response = await registerAccount({
      accountNumber: calculateData.account,
      bank: calculateData.bank.identifier,
    });

    setCalculateData((prev) => ({
      ...prev,
      accountId: response.id,
    }));

    navigation.navigate('CheckCalculateScreen', { roomPreview: roomPreview });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {registerAccountPending && <TransparentLoadingComponent />}

      <HeaderComponent title="도착완료 정산하기" />
      <View className="flex-1 px-4 pt-8">
        <View className="flex-1 px-3">
          {/* 글씨 */}
          <View className="flex-col">
            <Text className="text-xl font-semibold tracking-tight">아래 계좌번호로</Text>
            <Text className="text-xl font-semibold tracking-tight">정산을 요청할게요!</Text>
          </View>

          {/* 입력창 */}
          <View className="mt-4 flex-row items-center rounded-xl border-[1px] border-[#E2E2E2] bg-white px-6 py-4">
            <GetBankComponent bank={calculateData.bank.identifier} />
            <Text className="ml-2 mr-1 text-[16px] font-medium tracking-tight">
              {calculateData.bank.name}
            </Text>
            <Text className="text-[16px] font-medium tracking-tight">{calculateData.account}</Text>
          </View>

          <View className="mt-2 flex-col justify-start px-2">
            <Text className="text-[12px] tracking-tight text-[#5D5D5D]">
              계좌번호를 잘못 입력했다면
            </Text>
            <Text className="text-[12px] tracking-tight text-[#5D5D5D]">
              정산받기 어려워요 꼼꼼히 확인해주세요!
            </Text>
          </View>
        </View>

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
    </SafeAreaView>
  );
};

export default CheckAccountScreen;

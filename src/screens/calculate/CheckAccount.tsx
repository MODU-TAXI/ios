import { Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import { GetBankComponent } from '@components/Calculate/GetBank';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { userInfoState, calculateState } from '@recoil/recoil';

import { useDeleteAllNotifee } from '@hooks/notifee';
import { useRegisterAccount } from '@hooks/api/account';

import { CheckAccountScreenProps } from '@type/param/loginStack';

import Pencil from '@assets/images/Calculate/Pencil.svg';

const CheckAccountScreen = ({ navigation, route }: CheckAccountScreenProps) => {
  useDeleteAllNotifee();

  const { roomPreview } = route.params;

  const myInfo = useRecoilValue(userInfoState);

  const textInputRef = useRef<TextInput>(null);

  const [name, setName] = useState<string>(myInfo.name);

  const [calculateData, setCalculateData] = useRecoilState(calculateState);

  const { mutateAsync: registerAccount, isPending: registerAccountPending } = useRegisterAccount();

  const focusTextInput = () => {
    textInputRef.current?.focus();
  };

  const toNext = async () => {
    const response = await registerAccount({
      ownerName: name,
      accountNumber: calculateData.account,
      bank: calculateData.bank.identifier,
    });

    setCalculateData((prev) => ({
      ...prev,
      accountId: response.id,
      name: name,
    }));

    navigation.navigate('CheckCalculateScreen', { roomPreview: roomPreview });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {registerAccountPending && <TransparentLoadingComponent />}

      <HeaderComponent title="도착완료 정산하기" />
      <View className="flex-1 px-4 pt-8">
        <View className="flex-1">
          {/* 글씨 */}
          <View className="ml-1 flex-col">
            <Text className="text-xl font-semibold tracking-tight">아래 계좌번호로</Text>
            <Text className="text-xl font-semibold tracking-tight">정산을 요청할게요!</Text>
          </View>

          <View className="ml-2">
            {/* 예금주 */}
            <View className="mt-[26px] flex-row items-center justify-between">
              <View className="shrink flex-row items-center">
                <Text className="ml-1 mr-2 text-[16px] font-medium tracking-tight text-[#5D5D5D]">
                  예금주
                </Text>

                <TextInput
                  ref={textInputRef}
                  className="max-w-4 max-h-24 text-sm "
                  value={name}
                  onChangeText={setName}
                  placeholder="예금주명을 입력하세요"
                  multiline={false}
                  placeholderTextColor="#AFAFAF"
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                />
              </View>

              <Pencil onPress={focusTextInput} />
            </View>

            <View className="mt-2 border-b-[1px] border-b-[#EFEFEF]" />

            {/* 계좌 */}
            <View className="mt-4 flex-row items-center">
              <GetBankComponent bank={calculateData.bank.identifier} />

              <Text className="ml-2 mr-1 text-[16px] font-medium tracking-tight">
                {calculateData.bank.name}
              </Text>
              <Text className="text-[16px] font-medium tracking-tight">
                {calculateData.account}
              </Text>
            </View>

            <View className="mt-2 border-b-[1px] border-b-[#EFEFEF]" />
          </View>

          <View className="mt-4 flex-col justify-start px-2">
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

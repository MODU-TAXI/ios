import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/Calculate/InputBox';

import { calculateState } from '@recoil/recoil';

import { useGetRoomMembers } from '@hooks/api/rooms';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { AmountScreenProps } from '@type/param/loginStack';

const AmountScreen = ({ navigation, route }: AmountScreenProps) => {
  useDeleteAllNotifee();

  const { roomPreview } = route.params;

  const { roomMembers } = useGetRoomMembers(roomPreview.roomId); // 참여자 목록
  const [, setCalculateData] = useRecoilState(calculateState);
  const [amount, setAmount] = useState<string>('');
  const [expectedAmount] = useState<number>(roomPreview.expectedCharge);

  const amountError = parseInt(amount) > expectedAmount;

  const toAccountPage = async () => {
    const amountNumber = Number(amount);

    if (isNaN(amountNumber)) {
      return Alert.alert('숫자만 입력해주세요');
    }

    if (amountNumber > 1000000) {
      return Alert.alert('백만원 이하의 금액만 입력해주세요');
    }

    setCalculateData((prev) => ({
      ...prev,
      amount: amount,
      users: roomMembers.inList,
    }));

    navigation.navigate('AccountScreen', { roomPreview: roomPreview });
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <HeaderComponent title="도착완료 정산하기" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 px-4 pt-8">
          <View className="flex-1 px-3">
            {/* 글씨 */}
            <View className="flex-col">
              <Text className="text-xl font-semibold tracking-tight">목적지 도착 완료!</Text>
              <Text className="text-xl font-semibold tracking-tight">
                총 얼마가 나왔는지 알려주세요
              </Text>
            </View>

            {/* 입력창 */}
            <View className="mt-4">
              <InputBoxComponent
                value={amount}
                setValue={setAmount}
                error={amountError}
                placeholder="최종금액을 입력해주세요"
              />
            </View>

            {/* 경고 메세지 */}
            {amountError && (
              <View className="mt-2 px-2">
                <Text className="font-medium text-error">
                  예상금액보다 높아요. 다시 확인해주세요!
                </Text>
              </View>
            )}
          </View>

          <View className="mb-4 px-3">
            <ButtonComponent
              color={'bg-main'}
              borderColor={'border-main'}
              textColor={'white'}
              text={'확인'}
              disabled={!amount}
              onPress={toAccountPage}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AmountScreen;

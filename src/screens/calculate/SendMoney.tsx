import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { Text, View, Alert, Pressable, SafeAreaView } from 'react-native';

import ButtonComponent from '@components/Button';
import { GetBankComponent } from '@components/Calculate/GetBank';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { useDeleteAllNotifee } from '@hooks/notifee';
import { useCompletePayment, useGetPaymentDetail } from '@hooks/api/payment';

import { payWithToss } from '@utils/pay';
import { InfoToastMessage, InfoTopToastMessage } from '@utils/toastMessage';

import { banks } from '@type/entity/account';
import { SendMoneyScreenProps } from '@type/param/loginStack';

import Arrow from '@assets/images/Calculate/Arrow.svg';
import TossPay from '@assets/images/Calculate/TossPay.svg';
import CopyButton from '@assets/images/Calculate/CopyButton.svg';

const SendMoneyScreen = ({ navigation, route }: SendMoneyScreenProps) => {
  useDeleteAllNotifee();

  const { roomPreview } = route.params;

  const { payment, paymentMembers } = useGetPaymentDetail(roomPreview.roomId);

  const paymentPerPerson = payment.totalCharge / paymentMembers.participantList.length;

  const { mutateAsync: completePayment, isPending: completePaymentPending } = useCompletePayment(
    roomPreview.roomId,
  );

  const copyAccount = () => {
    Clipboard.setString(banks[payment.bank] + ' ' + String(payment.accountNumber));

    InfoTopToastMessage('계좌번호가 복사되었습니다.');
  };

  const completePay = async () => {
    await completePayment();
    navigation.goBack();
  };

  // 토스로 돈보내기
  const sendMoneyWithToss = async () => {
    await payWithToss(banks[payment.bank], payment.accountNumber, paymentPerPerson);
  };

  const checkPayment = async () => {
    Alert.alert('알림', '정말 정산을 완료했나요?', [
      {
        text: '다시 할게요',
        style: 'cancel',
      },

      {
        text: '정산 했어요',

        onPress: completePay,
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {completePaymentPending && <TransparentLoadingComponent />}

      <View className="flex-1 px-7 pt-8">
        <View className="flex-1">
          {/* 글씨 */}
          <View className="flex-col">
            <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">
              {payment.ownerName}님에게
            </Text>
            <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">
              <Text className="text-xl font-semibold tracking-tight text-main">
                {paymentPerPerson.toLocaleString('ko-KR')}원
              </Text>
              을 송금해주세요
            </Text>
          </View>

          {/* 토스 송금 */}
          <Pressable
            className="mt-6 flex-row items-center justify-between rounded-xl bg-[#F7F7F7] px-8 py-6"
            onPress={sendMoneyWithToss}
          >
            <View className="flex-row items-center">
              <TossPay className="mr-2" />

              <Text className="text-[16px] font-semibold tracking-tight text-[#5D5D5D] ">
                토스페이로 송금하러 가기
              </Text>
            </View>

            <Arrow />
          </Pressable>

          {/* 직접 송금 */}
          <Pressable
            className="mt-2 flex-row items-center justify-between rounded-xl bg-[#F7F7F7] px-8 py-4"
            onPress={copyAccount}
          >
            <View className="">
              <View className="flex-row items-center">
                <View className="mr-2">
                  <GetBankComponent bank={payment.bank} />
                </View>

                <Text className="text-[16px] font-semibold tracking-tight text-[#5D5D5D] ">
                  직접 송금하기
                </Text>
              </View>

              <View className="ml-8 mt-1">
                <Text className="text-[12px] font-medium tracking-tight text-[#7C7C7C]">
                  {banks[payment.bank]} {payment.accountNumber}
                </Text>
              </View>
            </View>

            <CopyButton />
          </Pressable>
        </View>

        <View className="mb-4">
          <ButtonComponent
            color={'bg-main'}
            borderColor={'border-main'}
            textColor={'white'}
            text={'정산완료'}
            disabled={false}
            onPress={checkPayment}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendMoneyScreen;

import React, { Suspense, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Alert, Pressable, ScrollView, RefreshControl } from 'react-native';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import LoadingComponent from '@components/Common/Loading';
import { GetBankComponent } from '@components/Calculate/GetBank';
import PaymentMembersComponent from '@components/Calculate/PaymentMembers';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import SuspenseErrorHandler from '@server/errorHandler/suspenseErrorHandler';

import { useDeleteAllNotifee } from '@hooks/notifee';
import { useCompletePayment, useGetPaymentDetail } from '@hooks/api/payment';

import { vibration } from '@utils/effect';
import { InfoToastMessage } from '@utils/toastMessage';

import { banks } from '@type/entity/account';
import { CheckPaymentScreenProps } from '@type/param/loginStack';

import CopyButton from '@assets/images/Calculate/CopyButton.svg';

const CheckPaymentComponent = ({ navigation, route }: CheckPaymentScreenProps) => {
  useDeleteAllNotifee();

  const { roomPreview } = route.params;

  const [refreshing, setRefreshing] = useState(false); // 새로고침시 필요한 변수

  const { payment, paymentMembers, getPaymentMembersRefetch } = useGetPaymentDetail(
    roomPreview.roomId,
  );

  const { mutateAsync: completePayment, isPending: completePaymentPending } = useCompletePayment(
    roomPreview.roomId,
  );

  const paymentPerPerson = payment.totalCharge / paymentMembers.participantList.length;

  const copyAccount = () => {
    Clipboard.setString(banks[payment.bank] + ' ' + String(payment.accountNumber));

    InfoToastMessage('계좌번호가 복사되었습니다.');
  };

  // 정산정보 새로고침
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    vibration();

    await getPaymentMembersRefetch();

    setRefreshing(false);
  }, [getPaymentMembersRefetch]);

  const completePay = async () => {
    await completePayment();
    navigation.goBack();
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
      <HeaderComponent title="도착완료 정산하기" />

      {completePaymentPending && <TransparentLoadingComponent />}

      <ScrollView
        className="px-7 pt-8"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* 글씨 */}
        <View className="flex-col">
          <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">정산 현황을</Text>
          <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">확인해주세요!</Text>
        </View>

        {/* 계좌번호 */}
        <View className="mt-4 flex-row items-center justify-between">
          <Text className="font-medium tracking-tight text-[#5D5D5D]">계좌번호</Text>

          <View className="flex-row items-center">
            <GetBankComponent bank={payment.bank} />
            <Text className="ml-2 mr-1 text-[16px] font-medium tracking-tight">
              {banks[payment.bank]}
            </Text>
            <Text className="text-[16px] font-medium tracking-tight">{payment.accountNumber}</Text>

            <Pressable onPress={copyAccount}>
              <CopyButton />
            </Pressable>
          </View>
        </View>

        {/* 총 금액 */}
        <View className="mt-4 flex-row items-center justify-between">
          <Text className="font-medium tracking-tight text-[#5D5D5D]">총금액</Text>

          <Text className="font-medium tracking-tight text-[#1F1F1F]">
            {payment.totalCharge.toLocaleString('ko-KR')}원
          </Text>
        </View>

        {/* 한명당 내야할 금액 */}
        <View className="mt-4 flex-row items-center justify-between">
          <Text className="font-medium tracking-tight text-[#5D5D5D]">한 명당 내야할 금액</Text>

          <Text className="font-medium tracking-tight text-main">
            {paymentPerPerson.toLocaleString('ko-KR')}원
          </Text>
        </View>

        <View className="my-6 border-[0.5px] border-[#D7D7D7]" />

        {/* 정산 멤버 */}
        <PaymentMembersComponent
          paymentMembers={paymentMembers.participantList}
          price={paymentPerPerson}
        />
      </ScrollView>

      <View className="mb-4 px-7">
        <ButtonComponent
          color={'bg-main'}
          borderColor={'border-main'}
          textColor={'white'}
          text={'확인'}
          disabled={false}
          onPress={checkPayment}
        />
      </View>
    </SafeAreaView>
  );
};

const CheckPaymentScreen = ({ route, navigation }: CheckPaymentScreenProps) => {
  return (
    <SuspenseErrorHandler navigation={navigation}>
      <Suspense fallback={<LoadingComponent />}>
        <CheckPaymentComponent navigation={navigation} route={route} />
      </Suspense>
    </SuspenseErrorHandler>
  );
};

export default CheckPaymentScreen;

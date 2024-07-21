import { Text, View } from 'react-native';
import React, { Suspense, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import LoadingComponent from '@components/Common/Loading';
import { GetBankComponent } from '@components/Calculate/GetBank';
import PaymentMembersComponent from '@components/Calculate/PaymentMembers';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import SuspenseErrorHandler from '@server/errorHandler/suspenseErrorHandler';

import { useDeleteAllNotifee } from '@hooks/notifee';
import { useGetPaymentDetail } from '@hooks/api/payment';

import { banks } from '@type/entity/account';
import { CheckPaymentScreenProps } from '@type/param/loginStack';

import RefreshButton from '@assets/images/Calculate/RefreshButton.svg';

const CheckPaymentComponent = ({ navigation, route }: CheckPaymentScreenProps) => {
  useDeleteAllNotifee();

  const { roomPreview } = route.params;

  const [resfresh, setRefresh] = useState<boolean>(false);

  const { payment, paymentMembers, getPaymentMembersRefetch } = useGetPaymentDetail(
    roomPreview.roomId,
  );

  const paymentPerPerson = payment.totalCharge / paymentMembers.participantList.length;

  // 정산정보 새로고침
  const onRefresh = async () => {
    setRefresh(true);
    await getPaymentMembersRefetch();
    setRefresh(false);
  };

  const completeCheck = async () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="도착완료 정산하기" />

      {resfresh && <TransparentLoadingComponent />}

      <View className="flex-1 px-5 pt-8">
        {/* 글씨 */}
        <View className="flex-row items-center justify-between">
          <View className="flex-col">
            <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">정산 현황을</Text>
            <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">
              확인해주세요!
            </Text>
          </View>

          <RefreshButton onPress={onRefresh} />
        </View>

        {/* 예금주 */}
        <View className="mt-6 flex-row items-center justify-between">
          <Text className="font-medium tracking-tight text-[#5D5D5D]">예금주</Text>

          <Text className="text-[14px] font-medium tracking-tight text-[#1F1F1F]">
            {payment.ownerName}
          </Text>
        </View>

        {/* 계좌번호 */}
        <View className="mt-4 flex-row items-center justify-between">
          <Text className="font-medium tracking-tight text-[#5D5D5D]">계좌번호</Text>

          <View className="flex-row items-center">
            <GetBankComponent bank={payment.bank} />
            <Text className="ml-2 mr-1 text-[14px] font-medium tracking-tight text-[#1F1F1F]">
              {banks[payment.bank]}
            </Text>
            <Text className="text-[14px] font-medium tracking-tight text-[#1F1F1F]">
              {payment.accountNumber}
            </Text>
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
      </View>

      <View className="mb-4 px-7">
        <ButtonComponent
          color={'bg-main'}
          borderColor={'border-main'}
          textColor={'white'}
          text={'확인'}
          disabled={false}
          onPress={completeCheck}
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

import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import { GetBankComponent } from '@components/Calculate/GetBank';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';
import ParticipateMembersComponent from '@components/Calculate/ParicipateMembers';
import UnParticipateMembersComponent from '@components/Calculate/UnParticipateMembers';

import { calculateState } from '@recoil/recoil';

import { usePayment } from '@hooks/api/payment';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { UserPreview } from '@type/entity/user';
import { CheckCalculateScreenProps } from '@type/param/loginStack';

const CheckCalculateScreen = ({ navigation, route }: CheckCalculateScreenProps) => {
  useDeleteAllNotifee();

  const { roomPreview } = route.params;

  const calculateData = useRecoilValue(calculateState);

  const [participateMembers, setParticipateMembers] = useState<UserPreview[]>(calculateData.users);
  const [unParticipateMembers, setUnParticipateMembers] = useState<UserPreview[]>([]);

  const amount = parseInt(calculateData.amount);
  const amountPerPerson =
    participateMembers.length === 0
      ? 0
      : parseInt(calculateData.amount) / participateMembers.length;

  const { mutateAsync: payment, isPending: paymentPending } = usePayment();

  // 정산 멤버에 추가
  const addUser = (member: UserPreview) => {
    const remainUsers = unParticipateMembers.filter(
      (unParticipateMember) => unParticipateMember.memberId !== member.memberId,
    );

    setUnParticipateMembers(remainUsers);

    setParticipateMembers((prev) => [...prev, member]);
  };

  // 정산 멤버에서 빼기
  const exceptUser = (member: UserPreview) => {
    const remainUsers = participateMembers.filter(
      (participateMember) => participateMember.memberId !== member.memberId,
    );

    setParticipateMembers(remainUsers);

    setUnParticipateMembers((prev) => [...prev, member]);
  };

  // 정산하기
  const toCompleteCalculateScreen = async () => {
    await payment({
      roomId: roomPreview.roomId,
      accountId: calculateData.accountId,
      totalCharge: parseInt(calculateData.amount),
      participantList: participateMembers.map((participateMember) => {
        return { id: participateMember.memberId };
      }),
      nonParticipantList: unParticipateMembers.map((unParticipateMember) => {
        return { id: unParticipateMember.memberId };
      }),
    });
    navigation.navigate('CompleteCalculateScreen', { roomPreview: roomPreview });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {paymentPending && <TransparentLoadingComponent />}

      <HeaderComponent title="도착완료 정산하기" />
      <View className="flex-1 px-4 pt-8">
        <View className="flex-1 pl-1">
          {/* 글씨 */}
          <View className="flex-col ">
            <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">
              정산 내용을 정확히
            </Text>
            <Text className="text-xl font-semibold tracking-tight text-[#1F1F1F]">
              확인해주세요!
            </Text>
          </View>

          {/* 예금주 */}
          <View className="mt-6 flex-row items-center justify-between">
            <Text className="font-medium tracking-tight text-[#5D5D5D]">예금주</Text>

            <Text className="text-[14px] font-medium tracking-tight text-[#1F1F1F]">
              {calculateData.name}
            </Text>
          </View>

          {/* 계좌번호 */}
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="font-medium tracking-tight text-[#5D5D5D]">계좌번호</Text>

            <View className="flex-row items-center">
              <GetBankComponent bank={calculateData.bank.identifier} />
              <Text className="ml-2 mr-1 text-[14px] font-medium tracking-tight text-[#1F1F1F]">
                {calculateData.bank.name}
              </Text>
              <Text className="text-[14px] font-medium tracking-tight text-[#1F1F1F]">
                {calculateData.account}
              </Text>
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
          <ParticipateMembersComponent
            participateMembers={participateMembers}
            price={amount}
            exceptUser={exceptUser}
          />

          {unParticipateMembers.length === 0 && <View className="flex-1" />}

          {/* 정산 멤버 미포함 */}
          {unParticipateMembers.length > 0 && (
            <UnParticipateMembersComponent
              unParticipateMembers={unParticipateMembers}
              price={amount}
              addUser={addUser}
            />
          )}

          <View className="mb-4 px-3">
            <ButtonComponent
              color={'bg-main'}
              borderColor={'border-main'}
              textColor={'white'}
              text={'정산 요청하기'}
              disabled={participateMembers.length === 0}
              onPress={toCompleteCalculateScreen}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckCalculateScreen;

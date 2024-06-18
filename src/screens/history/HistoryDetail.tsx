import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import UserModalComponent from '@components/Common/UserModal';
import HistoryMembersComponent from '@components/History/HistoryMembers';

import { useGetHistoryDetail } from '@hooks/api/history';

import { UserPreview } from '@type/entity/user';
import { HistoryDetailScreenProps } from '@type/param/loginStack';

import Arrow from '@assets/images/History/Arrow.svg';

export interface RoomMember {
  memberId: number;
  nickname: string;
  imageUrl: string;
  thisIsMe: boolean;
}

const HistoryDetailScreen = ({ navigation, route }: HistoryDetailScreenProps) => {
  const { historyId } = route.params;

  const { data: history } = useGetHistoryDetail(historyId);

  const [userModalVisible, setUserModalVisible] = useState<boolean>(false); // 유저 인포 모달
  const [userInfo, setUserInfo] = useState<UserPreview>();

  const manager = history.paymentMemberListResponse.participantList.filter(
    (member) => member.id == history.managerId,
  );

  const members = history.paymentMemberListResponse.participantList.filter(
    (member) => member.id != history.managerId,
  );

  // 유저 인포 모달 열기
  const openUserInfoModal = (user: UserPreview) => {
    setUserInfo(user);
    setUserModalVisible(true);
  };

  // 유저 인포 모달 닫기
  const closeUserInfoModal = () => {
    setUserModalVisible(false);
  };

  // 신고페이지로 이동
  const toDeclarationScreen = () => {
    if (userInfo) {
      closeUserInfoModal();
      navigation.navigate('DeclarationScreen', { userInfo: userInfo, roomId: history.roomId });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="이용내역" />

      <View className="mt-4 flex-1 px-4">
        <View className="rounded-[20px] border-[1px] border-[#EAEAEA] p-5">
          {/* 출발지, 도착지, 날짜*/}
          <View>
            <View className="flex-row items-center">
              <Text className="text-[16px] font-semibold tracking-tight text-[#1F1F1F]">
                {history.departureName}
              </Text>
              <Arrow className="mx-1" />
              <Text className="text-[16px] font-semibold tracking-tight text-[#1F1F1F]">
                {history.arrivalName}
              </Text>
            </View>

            <View className="mt-1">
              <Text className="text-[12px] tracking-tight text-[#9C9C9C]">
                {dayjs(history.departureTime).format('YYYY.MM.DD HH:MM')}
              </Text>
            </View>
          </View>

          <View className="my-4 border-b-[1px] border-[#EAEAEA]" />

          {/* 방장 */}
          <View>
            <View>
              <Text className="font-semibold tracking-tight text-[#5D5D5D]">방장</Text>
            </View>

            <HistoryMembersComponent
              historyMembers={manager}
              price={history.portionCharge}
              openUserInfoModal={openUserInfoModal}
            />
          </View>

          {/* 참여멤버 */}
          <View className="mt-6">
            <View>
              <Text className="font-semibold tracking-tight text-[#5D5D5D]">참여멤버</Text>
            </View>

            <HistoryMembersComponent
              historyMembers={members}
              price={history.portionCharge}
              openUserInfoModal={openUserInfoModal}
            />
          </View>

          <View className="my-4 border-b-[1px] border-[#EAEAEA]" />

          {/* 총액, 최종 정산 금액 */}
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="font-medium tracking-tight text-[#9C9C9C]">총액</Text>
              <Text className="font-medium tracking-tight text-[#1F1F1F]">
                {history.totalCharge.toLocaleString('ko-KR')}원
              </Text>
            </View>

            <View className="mt-2 flex-row items-center justify-between">
              <Text className="font-medium tracking-tight text-[#9C9C9C]">최종 정산 금액</Text>
              <Text className="font-medium tracking-tight text-[#1F1F1F]">
                {history.portionCharge.toLocaleString('ko-KR')}원
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1" />

        <View className="flex-row justify-center">
          <Text className="text-[12px] font-medium tracking-tight text-[#9C9C9C]">
            채팅방은 2주가 지나면 읽을 수 없어요
          </Text>
        </View>

        <View className="mb-[14px] mt-2 px-4">
          <ButtonComponent
            color={'bg-white'}
            borderColor={'border-main'}
            textColor={'main'}
            text={'채팅방 입장하기'}
            disabled={false}
            onPress={() => {
              console.log('?');
            }}
          />
        </View>
      </View>

      {/* 유저 정보 modal */}
      {userInfo && (
        <UserModalComponent
          userInfo={userInfo}
          modalVisible={userModalVisible}
          closeUserInfoModal={closeUserInfoModal}
          toDeclarationScreen={toDeclarationScreen}
        />
      )}
    </SafeAreaView>
  );
};

export default HistoryDetailScreen;

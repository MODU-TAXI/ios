import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, Suspense, useEffect, useCallback } from 'react';

import { useChatContext } from 'src/providers/chatProvider';

import ButtonComponent from '@components/Button';
import LoadingComponent from '@components/Common/Loading';
import RoomMapComponent from '@components/RoomDigest/RoomMap';
import RoomHeaderComponent from '@components/Home/RoomHeader';
import UpdateModalComponent from '@components/RoomDigest/UpdateModal';
import WaitingUsersComponent from '@components/RoomDigest/WaitingUsers';
import RoomCategoriesComponent from '@components/RoomDigest/RoomCategories';
import ParticipateUsersComponent from '@components/RoomDigest/ParticipateUsers';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { roomState } from '@recoil/recoil';

import { useJoinRoom, useDeleteRoom, useGetRoomDetail, useApproveJoinRoom } from '@hooks/api/rooms';

import { RoomDetailScreenProps } from '@type/param/loginStack';

import EndCircle from '@assets/images/Match/EndCircle.svg';
import DottedLine from '@assets/images/Match/DottedLine.svg';
import StartCircle from '@assets/images/Match/StartCircle.svg';

dayjs.locale('ko');

const RoomDetailComponent = ({ route, navigation }: RoomDetailScreenProps) => {
  const { roomId } = route.params;

  const { connect, disConnect, stompClient } = useChatContext();

  const [, setSocketRoomId] = useRecoilState(roomState);

  const {
    roomDetail,
    participateMembers,
    waitingMembers,
    refetchRoomDetail,
    refetcParticipateMembers,
    refetchWaitingMembers,
  } = useGetRoomDetail(roomId); // 방정보들 가져오기

  const { mutateAsync: joinRoomMutate, isPending: joinRoomPending } = useJoinRoom(roomId); // 방 입장 mutate
  const { mutateAsync: applyJoinRoomMutate, isPending: approveRoomPending } =
    useApproveJoinRoom(roomId); // 방 입장 수락 mutate
  const { mutateAsync: deleteRoomMutate, isPending: deleteRoomPending } = useDeleteRoom(roomId); // 방 삭제 mutate
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);

  // 만약 참여하고 있는 상태이고 socket이 connected되지 않았다면 socket 재연결
  useEffect(() => {
    if (roomDetail.participate && !stompClient.current.connected) {
      connect(roomDetail.roomId);
      setSocketRoomId(roomId);
    }
  }, [roomDetail, stompClient, roomId, connect, setSocketRoomId]);

  // 수정, 삭제 모달창 열기
  const openUpdateModal = () => {
    setUpdateModalVisible(true);
  };

  // 수정, 삭제 모달창 닫기
  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  // 방 입장 요청
  const joinRoom = async () => {
    await joinRoomMutate(roomId);

    refetcParticipateMembers(); // 멤버 refetch
    refetchWaitingMembers(); // 대기 멤버 refetch
  };

  // 방 입장 수락
  const applyJoinRoom = async (memberId: number) => {
    await applyJoinRoomMutate(memberId);

    refetcParticipateMembers(); // 멤버 refetch
    refetchWaitingMembers(); // 대기 멤버 refetch
  };

  // 방 삭제
  const deleteRoom = async () => {
    setUpdateModalVisible(false);

    await deleteRoomMutate();

    // socket RoomId도 -1로 초기화
    setSocketRoomId(-1);
    disConnect();

    // stack을 지우며 해당 roomDetail로 이동
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainScreen' }],
    });
  };

  // 방 수정페이지로 이동
  const toPatchRoomScreen = useCallback(async (): Promise<void> => {
    setUpdateModalVisible(false);

    navigation.navigate('PatchRoomScreen', { roomDetail: roomDetail });
  }, []);

  // 채팅방으로 이동
  const toChatRoomScreen = async () => {
    navigation.navigate('ChatRoomScreen', { roomId: roomDetail.roomId });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 삭제, 입장, 수락시 로딩 */}
      {(deleteRoomPending || joinRoomPending || approveRoomPending) && (
        <TransparentLoadingComponent />
      )}

      {/* 헤더 */}
      <RoomHeaderComponent openUpdateModal={openUpdateModal} myRoom={roomDetail.myRoom} />
      <ScrollView className="mt-8 flex-1 px-4">
        {/* 카테고리 */}
        <RoomCategoriesComponent roomCategories={roomDetail.roomCategories} />

        {/* 지도 */}
        <RoomMapComponent roomDetail={roomDetail} />

        {/* 날짜, 출발지, 도착지 정보 */}
        <View className="px-2 py-8">
          <View>
            <Text className="text-lg font-medium text-emphasized">
              {roomDetail.departureDairyDate}
            </Text>
          </View>

          <View className="mt-5">
            <View>
              <View className="flex-row items-center">
                <StartCircle />

                <Text className="ml-4 text-lg font-normal text-disabled2">
                  {roomDetail.departureTime}
                </Text>
              </View>
            </View>

            <View className="my-1 ml-[6px] flex-row">
              <View className="h-[46px] w-px bg-main" />

              <Text className="ml-6 text-lg font-semibold">{roomDetail.departureName}</Text>
            </View>

            <View>
              <View className="flex-row items-center">
                <EndCircle />

                <Text className="ml-4 text-lg font-normal text-disabled2">
                  {roomDetail.arrivalTime}
                </Text>
              </View>

              <Text className="ml-[31px] mt-1 text-lg font-semibold">{roomDetail.arrivalName}</Text>
            </View>
          </View>
        </View>

        {/* 점선 */}
        <DottedLine width="100%" />

        {/* 참여멤버 */}
        <ParticipateUsersComponent roomMembers={participateMembers.inList} />

        {/* 대기 멤버 */}
        <WaitingUsersComponent
          roomWaitingMembers={waitingMembers.waitingList}
          applyJoinRoom={applyJoinRoom}
          myRoom={roomDetail.myRoom}
        />

        {/* 점선 */}
        <DottedLine width="100%" />

        {/* 금액 */}
        <View className="px-3 py-8">
          <View className="flex-row justify-between">
            <Text className="font-medium text-base text-disabled2">총액</Text>
            <Text className="font-medium text-base text-black">
              {roomDetail.expectedCharge.toLocaleString('ko-KR')}원
            </Text>
          </View>

          <View className="mt-4 flex-row justify-between">
            <Text className="font-medium text-base text-disabled2">최소인원 매칭시</Text>
            <Text className="font-medium text-base text-black">
              {roomDetail.expectedChargePerPerson.toLocaleString('ko-KR')}원
            </Text>
          </View>
        </View>

        {/* 버튼 */}
        {roomDetail.myRoom || roomDetail.participate ? (
          <View className="mx-5 mb-10 mt-[78px]">
            <ButtonComponent
              color={'bg-white'}
              borderColor={'border-main'}
              textColor={'gray500'}
              text={'채팅방으로 이동'}
              disabled={false}
              onPress={toChatRoomScreen}
            />
          </View>
        ) : (
          <View className="mx-5 mb-10 mt-[78px]">
            <ButtonComponent
              color={'bg-main'}
              borderColor={'border-main'}
              textColor={'white'}
              text={'매칭 참여하기'}
              disabled={false}
              onPress={joinRoom}
            />
          </View>
        )}

        {/* 수정,삭제 모달 */}
        <UpdateModalComponent
          updateModalVisible={updateModalVisible}
          closeUpdateModal={closeUpdateModal}
          patchRoom={toPatchRoomScreen}
          deleteRoom={deleteRoom}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const RoomDetailScreen = ({ route, navigation }: RoomDetailScreenProps) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <RoomDetailComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

export default RoomDetailScreen;

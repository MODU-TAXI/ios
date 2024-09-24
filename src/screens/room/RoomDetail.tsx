import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import React, { useRef, useState, Suspense } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Alert, RefreshControl } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import ButtonComponent from '@components/Button';
import LoadingComponent from '@components/Common/Loading';
import RoomMapComponent from '@components/RoomDigest/RoomMap';
import UserModalComponent from '@components/Common/UserModal';
import RoomHeaderComponent from '@components/RoomDigest/RoomHeader';
import UpdateModalComponent from '@components/RoomDigest/UpdateModal';
import ManagerComponent from '@components/RoomDigest/ManagerComponent';
import WaitingUsersComponent from '@components/RoomDigest/WaitingUsers';
import RoomCategoriesComponent from '@components/RoomDigest/RoomCategories';
import ParticipateUsersComponent from '@components/RoomDigest/ParticipateUsers';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { CurrentRoomRecoil } from '@recoil/type';
import { userInfoState, currentRoomRecoilState } from '@recoil/recoil';

import SuspenseErrorHandler from '@server/errorHandler/suspenseErrorHandler';

import { useDeleteAllNotifee } from '@hooks/notifee';
import {
  useJoinRoom,
  useDeleteRoom,
  useGetRoomDetail,
  useApproveJoinRoom,
  useExitWaitingRoom,
} from '@hooks/api/rooms';

import { refreshVibration } from '@utils/effect';

import { UserPreview } from '@type/entity/user';
import { RoomWaitingMember } from '@type/entity/room';
import { RoomDetailScreenProps } from '@type/param/loginStack';

import EndCircle from '@assets/images/Match/EndCircle.svg';
import DottedLine from '@assets/images/Match/DottedLine.svg';
import StartCircle from '@assets/images/Match/StartCircle.svg';

dayjs.locale('ko');

const RoomDetailComponent = ({ route, navigation }: RoomDetailScreenProps) => {
  useDeleteAllNotifee();

  const { roomId } = route.params;

  const scrollViewRef = useRef<ScrollView>(null);
  const setCurrentRoomRecoil = useSetRecoilState<CurrentRoomRecoil>(currentRoomRecoilState);
  const [refreshing, setRefreshing] = useState(false); // 새로고침시 필요한 변수

  const {
    roomDetail,
    participateMembers,
    waitingMembers,
    refetchRoomDetail,
    refetchParticipateMembers,
    refetchWaitingMembers,
    pending,
    queryClient,
  } = useGetRoomDetail(roomId); // 방정보들 가져오기

  const myInfo = useRecoilValue(userInfoState);
  const { mutateAsync: joinRoomMutate, isPending: joinRoomPending } = useJoinRoom(roomId); // 방 입장 mutate
  const { mutateAsync: applyJoinRoomMutate, isPending: approveRoomPending } =
    useApproveJoinRoom(roomId); // 방 입장 수락 mutate
  const { mutateAsync: deleteRoomMutate, isPending: deleteRoomPending } = useDeleteRoom(roomId); // 방 삭제 mutate
  const { mutateAsync: exitWaitingRoomMutate, isPending: exitWaitingRoomPending } =
    useExitWaitingRoom(roomId); // 대기열에서 퇴장 mutate
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserPreview>();
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 유저 인포 모달

  // 밑으로 내리기
  const toBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  // 방장
  const manager = participateMembers.inList.filter(
    (participateMember) => participateMember.memberId == roomDetail.managerId,
  );

  // 대기열 참여자들
  const members = participateMembers.inList.filter(
    (participateMember) => participateMember.memberId != roomDetail.managerId,
  );

  // 대기열 참여 여부
  const isWaiting = waitingMembers.waitingList.some((member) => member.memberId === myInfo.id);

  // 방정보 새로고침
  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);

      refreshVibration();

      await Promise.all([
        refetchRoomDetail(),
        refetchParticipateMembers(),
        refetchWaitingMembers(),
      ]);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  }, [refetchRoomDetail]);

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

    await Promise.all([refetchParticipateMembers(), refetchWaitingMembers()]);

    toBottom();
  };

  // 대기열에서 퇴장
  const exitWaitingRoom = async () => {
    Alert.alert('알림', '대기신청을 취소하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },

      {
        text: '확인',
        onPress: async () => {
          await exitWaitingRoomMutate();

          await Promise.all([refetchParticipateMembers(), refetchWaitingMembers()]);
        },
      },
    ]);
  };

  // 방 입장 수락
  const applyJoinRoom = async (waitingMember: RoomWaitingMember) => {
    Alert.alert(
      '참여 수락',
      `${waitingMember.nickname}님의 참여를 수락하시겠어요?`,
      [
        {
          text: '취소',
        },
        {
          text: '확인',
          onPress: async () => {
            await applyJoinRoomMutate(waitingMember.memberId);

            await Promise.all([refetchParticipateMembers(), refetchWaitingMembers()]);
          },
        },
      ],
      { cancelable: false },
    );
  };

  // 방 삭제
  const deleteRoom = async () => {
    closeUpdateModal();

    await deleteRoomMutate();

    // socket RoomId도 -1로 초기화
    setCurrentRoomRecoil(-1);

    // stack을 지우며 해당 roomDetail로 이동
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainScreen' }],
    });
  };

  // 방 삭제 확인 창
  const checkDeleteRoom = async () => {
    Alert.alert(
      '택시팟 삭제',
      '택시팟을 정말 삭제하시겠어요?',
      [
        {
          text: '취소',
          onPress: () => {
            closeUpdateModal();
          },
        },
        {
          text: '확인',
          onPress: deleteRoom,
        },
      ],
      { cancelable: false },
    );
  };

  // 유저 인포 모달 열기
  const openUserInfoModal = (user: UserPreview) => {
    setUserInfo(user);
    setModalVisible(true);
  };

  // 유저 인포 모달 닫기
  const closeUserInfoModal = () => {
    setModalVisible(false);
  };

  // 방 수정페이지로 이동
  const toPatchRoomScreen = async (): Promise<void> => {
    queryClient.invalidateQueries();
    refetchRoomDetail();
    setUpdateModalVisible(false);

    navigation.navigate('PatchRoomScreen', { roomDetail: roomDetail });
  };

  // 채팅방으로 이동
  const toChatRoomScreen = async () => {
    navigation.navigate('ChatRoomScreen', {
      roomId: roomDetail.roomId,
      readonly: false,
    });
  };

  if (pending) return <LoadingComponent />;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 삭제, 입장, 수락시 로딩 */}
      {(deleteRoomPending || joinRoomPending || approveRoomPending || exitWaitingRoomPending) && (
        <TransparentLoadingComponent />
      )}

      {/* 헤더 */}
      <RoomHeaderComponent openUpdateModal={openUpdateModal} myRoom={roomDetail.myRoom} />

      <ScrollView
        ref={scrollViewRef}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        className="mt-8 flex-1 px-4"
      >
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

        {/* 방장 */}
        <ManagerComponent manager={manager[0]} openUserInfoModal={openUserInfoModal} />

        {/* 참여멤버 */}
        <ParticipateUsersComponent roomMembers={members} openUserInfoModal={openUserInfoModal} />

        {/* 대기 멤버 */}
        <WaitingUsersComponent
          roomWaitingMembers={waitingMembers.waitingList}
          applyJoinRoom={applyJoinRoom}
          myRoom={roomDetail.myRoom}
          openUserInfoModal={openUserInfoModal}
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
        ) : isWaiting ? (
          <View className="mx-5 mb-10 mt-[78px]">
            <ButtonComponent
              color={'bg-gray-400'}
              borderColor={'border-gray-400'}
              textColor={'white'}
              text={'대기 취소하기'}
              disabled={false}
              onPress={exitWaitingRoom}
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

        {/* 유저 정보 modal */}
        {userInfo && (
          <UserModalComponent
            userInfo={userInfo}
            modalVisible={modalVisible}
            closeUserInfoModal={closeUserInfoModal}
            canReport={false}
          />
        )}

        {/* 수정,삭제 모달 */}
        <UpdateModalComponent
          updateModalVisible={updateModalVisible}
          closeUpdateModal={closeUpdateModal}
          patchRoom={toPatchRoomScreen}
          checkDeleteRoom={checkDeleteRoom}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const RoomDetailScreen = ({ route, navigation }: RoomDetailScreenProps) => {
  return (
    <SuspenseErrorHandler navigation={navigation}>
      <Suspense fallback={<LoadingComponent />}>
        <RoomDetailComponent navigation={navigation} route={route} />
      </Suspense>
    </SuspenseErrorHandler>
  );
};

export default RoomDetailScreen;

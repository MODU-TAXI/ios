import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { View, Text } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

import { useChatContext } from 'src/providers/chatProvider';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import DottedLineComponent from '@components/DottedLine';
import RoomMapComponent from '@components/RoomDigest/RoomMap';
import WaitingUsersComponent from '@components/RoomDigest/WaitingUsers';
import RoomCategoriesComponent from '@components/RoomDigest/RoomCategories';
import ParticipateUsersComponent from '@components/RoomDigest/ParticipateUsers';

import { roomState } from '@recoil/recoil';

import {
  useGetRoom,
  useJoinRoom,
  useDeleteRoom,
  useGetRoomMembers,
  useApproveJoinRoom,
  useGetRoomWaitingMembers,
} from '@hooks/api/rooms';

import { RoomDetailScreenProps } from '@type/param/loginStack';

import EndCircle from '@assets/images/Match/EndCircle.svg';
import StartCircle from '@assets/images/Match/StartCircle.svg';

dayjs.locale('ko');

const RoomDetailScreen = ({ route, navigation }: RoomDetailScreenProps) => {
  // 이거를 쓰라~
  const isFocused = useIsFocused();

  const { roomId } = route.params;

  const [, setSocketRoomId] = useRecoilState(roomState);
  const { roomDetail, getRoomRefetch } = useGetRoom(roomId); // 방 상세 정보
  const { roomMembers } = useGetRoomMembers(roomId); // 참여자 목록
  const { roomWaitingMembers } = useGetRoomWaitingMembers(roomId); // 대기자 목록
  const { mutateAsync: joinRoomMutate } = useJoinRoom(roomId); // 방 입장 mutate
  const { mutateAsync: applyJoinRoomMutate } = useApproveJoinRoom(roomId); // 방 입장 수락 mutate
  const { mutateAsync: deleteRoomMutate } = useDeleteRoom(roomId); // 방 삭제 mutate

  const { connect } = useChatContext();

  // 방을 수정하고 다시 focusing 되었을때 api 재호출 -> 이 로직은 수정하지 않았을때는 두번 호출됨 수정해야할듯
  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        getRoomRefetch();
      }
    }, [isFocused]),
  );

  // 만약 참여하고 있는 상태라면 socket 재연결
  useEffect(() => {
    if (roomDetail.participate) {
      connect(roomDetail.roomId);
    }
  }, [roomDetail.participate, roomDetail.roomId, connect]);

  // 방 입장 요청
  const joinRoom = async () => {
    await joinRoomMutate(roomId);

    setSocketRoomId(roomId);
  };

  // 방 입장 수락
  const applyJoinRoom = async (memberId: number) => {
    await applyJoinRoomMutate(memberId);
  };

  // 방 삭제
  const deleteRoom = async () => {
    await deleteRoomMutate();

    navigation.navigate('HomeScreen');
  };

  // 방 수정페이지로 이동
  const toPatchRoomScreen = useCallback(async (): Promise<void> => {
    navigation.navigate('PatchRoomScreen', { roomDetail: roomDetail });
  }, []);

  // 채팅방으로 이동
  const toChatRoomScreen = async () => {
    navigation.navigate('ChatRoomScreen', { roomId: roomDetail.roomId });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 헤더 */}
      <HeaderComponent title={'매칭 페이지'} />

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

            <View className="my-2 ml-[6px] flex-row">
              <View className="h-[46px] w-px bg-main" />

              <Text className="ml-6 text-[20px] font-semibold">{roomDetail.departureName}</Text>
            </View>

            <View>
              <View className="flex-row items-center">
                <EndCircle />

                <Text className="ml-4 text-lg font-normal text-disabled2">
                  {roomDetail.arrivalTime}
                </Text>
              </View>

              <Text className="ml-[31px] mt-2 text-[20px] font-semibold">
                {roomDetail.arrivalName}
              </Text>
            </View>
          </View>
        </View>

        {/* 점선 */}
        <DottedLineComponent />

        {/* 참여멤버 */}
        <ParticipateUsersComponent roomMembers={roomMembers.inList} />

        {/* 대기 멤버(방장만 확인 가능) */}
        {roomDetail.myRoom && (
          <WaitingUsersComponent
            roomWaitingMembers={roomWaitingMembers.waitingList}
            applyJoinRoom={applyJoinRoom}
          />
        )}

        {/* 점선 */}
        <DottedLineComponent />

        {/* 금액 */}
        <View className="py-8">
          <View className="flex-row justify-between">
            <Text className="text-lg font-medium text-disabled2">총액</Text>
            <Text className="text-lg font-medium text-black">
              {roomDetail.expectedCharge.toLocaleString('ko-KR')}원
            </Text>
          </View>

          <View className="mt-4 flex-row justify-between">
            <Text className="text-lg font-medium text-disabled2">최소인원 매칭시</Text>
            <Text className="text-lg font-medium text-black">
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomDetailScreen;

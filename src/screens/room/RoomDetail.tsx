import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { useDeleteRoom, useGetRoom, useJoinRoom } from '@hooks/api/rooms';
import { memberIdState } from '@recoil/recoil';
import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import DottedLineComponent from '@components/DottedLine';
import ParticipateUsersComponent from '@components/RoomDigest/ParticipateUsers';
import WaitingUsersComponent from '@components/RoomDigest/WaitingUsers';
import RoomMapComponent from '@components/RoomDigest/RoomMap';
import RoomCategoriesComponent from '@components/RoomDigest/RoomCategories';
import StartCircle from '@assets/images/Match/StartCircle.svg';
import EndCircle from '@assets/images/Match/EndCircle.svg';
import 'dayjs/locale/ko';
import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { LoginStackParamList } from '@type/ParamLists';

dayjs.locale('ko');

const RoomDetailScreen = () => {
  // 이거를 쓰라~
  const isFocused = useIsFocused();

  const roomId = 29; // 방 Id
  const myParty = true; // 내가 만든 건지 여부
  const navigation = useNavigation<NavigationProp<LoginStackParamList>>();
  const [memberId, setMemberId] = useRecoilState(memberIdState); // 사용자 정보

  const { roomDetail, refetch } = useGetRoom(roomId); // 방 상세 정보 객체
  const { mutateAsync: joinRoomMutate } = useJoinRoom(roomId); // 방 입장 mutate
  const { mutateAsync: deleteRoomMutate } = useDeleteRoom(roomId);

  // 방을 수정하고 다시 focusing 되었을때 api 재호출 -> 이 로직은 수정하지 않았을때는 두번 호출됨 수정해야할듯
  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        refetch();
      }
    }, [isFocused]),
  );

  // 방 입장
  const joinRoom = async () => {
    await joinRoomMutate(roomId);

    // 어디로 이동?
  };

  // 방 삭제
  const deleteRoom = async () => {
    await deleteRoomMutate();
    navigation.navigate('HomeScreen');
  };

  // 방 수정페이지로 이동
  const toPatchRoomScreen = useCallback(async (): Promise<void> => {
    navigation.navigate('PatchRoomScreen', { key: roomDetail });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 헤더 */}
      <HeaderComponent title={'매칭 페이지'} />

      <ScrollView className="flex-1 px-4 mt-8">
        {/* 카테고리 */}
        <RoomCategoriesComponent roomCategories={roomDetail.roomCategories} />

        {/* 지도 */}
        <RoomMapComponent roomDetail={roomDetail} />

        {/* 날짜, 출발지, 도착지 정보 */}
        <View className="py-8 px-2">
          <View>
            <Text className="text-lg font-medium text-emphasized">
              {roomDetail.departureDairyDate}
            </Text>
          </View>

          <View className="mt-5">
            <View>
              <View className="flex-row items-center">
                <StartCircle />

                <Text className="text-lg text-disabled2 font-normal ml-4">
                  {roomDetail.departureTime}
                </Text>
              </View>
            </View>

            <View className="flex-row ml-[6px] my-2">
              <View className="w-[1px] h-[46px] bg-main" />

              <Text className="ml-6 text-[20px] font-semibold">
                {roomDetail.departureName}
              </Text>
            </View>

            <View>
              <View className="flex-row items-center">
                <EndCircle />

                <Text className="text-lg text-disabled2 font-normal ml-4">
                  {roomDetail.arrivalTime}
                </Text>
              </View>

              <Text className="text-[20px] font-semibold ml-[31px] mt-2">
                {roomDetail.arrivalName}
              </Text>
            </View>
          </View>
        </View>

        {/* 점선 */}
        <DottedLineComponent />

        {/* 참여멤버 */}
        <ParticipateUsersComponent roomId={5} />

        {/* 대기 멤버(방장만 확인 가능) */}
        {myParty && <WaitingUsersComponent roomId={1} />}

        {/* 점선 */}
        <DottedLineComponent />

        {/* 금액 */}
        <View className="py-8">
          <View className="flex-row justify-between">
            <Text className="text-lg text-disabled2 font-medium">총액</Text>
            <Text className="text-lg text-black font-medium">
              {roomDetail.expectedCharge.toLocaleString('ko-KR')}원
            </Text>
          </View>

          <View className="flex-row justify-between mt-4">
            <Text className="text-lg text-disabled2 font-medium">
              최소인원 매칭시
            </Text>
            <Text className="text-lg text-black font-medium">
              {roomDetail.expectedChargePerPerson.toLocaleString('ko-KR')}원
            </Text>
          </View>
        </View>

        {myParty ? (
          <View>
            <View className="mt-[78px] mx-5">
              <ButtonComponent
                color={'bg-white'}
                borderColor={'border-main'}
                textColor={'gray500'}
                text={'매칭 수정하기'}
                disabled={false}
                onPress={toPatchRoomScreen}
              />
            </View>

            <View className="mt-3 mx-5 mb-10">
              <ButtonComponent
                color={'bg-main'}
                borderColor={'border-main'}
                textColor={'white'}
                text={'매칭 삭제하기'}
                disabled={false}
                onPress={deleteRoom}
              />
            </View>
          </View>
        ) : (
          <View className="mt-3 mx-5 mb-10">
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

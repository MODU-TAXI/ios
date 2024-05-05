import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
import { useGetRoom } from '@hooks/api/rooms';
import { memberIdState } from '@recoil/recoil';

import RoomTagComponent from '@components/RoomDigest/RoomCategory';
import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import DottedLineComponent from '@components/DottedLine';
import ParticipateUsersComponent from '@components/RoomDigest/ParticipateUsers';
import WaitingUsersComponent from '@components/RoomDigest/WaitingUsers';
import RoomMapComponent from '@components/RoomDigest/RoomMap';
import StartCircle from '@assets/images/Match/StartCircle.svg';
import EndCircle from '@assets/images/Match/EndCircle.svg';
import RoomCategoriesComponent from '@components/RoomDigest/RoomCategories';

const RoomDetailScreen = () => {
  // 사용자 정보
  const [memberId, setMemberId] = useRecoilState(memberIdState);

  // 방 상세 정보 객체
  const roomDetail = useGetRoom(1);

  const myParty = false;

  // 다음으로
  const toNext = useCallback(async (): Promise<void> => {
    console.log('ok');
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
                  {roomDetail.arrivalTime}
                </Text>
              </View>
            </View>

            <View className="flex-row ml-[6px] my-2">
              <View className="w-[1px] h-[46px] bg-main" />

              <Text className="ml-6 text-[20px] font-semibold">
                {roomDetail.arrivalName}
              </Text>
            </View>

            <View>
              <View className="flex-row items-center">
                <EndCircle />

                <Text className="text-lg text-disabled2 font-normal ml-4">
                  {roomDetail.departureTime}
                </Text>
              </View>

              <Text className="text-[20px] font-semibold ml-[31px] mt-2">
                {roomDetail.departureName}
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
                onPress={toNext}
              />
            </View>

            <View className="mt-3 mx-5 mb-10">
              <ButtonComponent
                color={'bg-main'}
                borderColor={'border-main'}
                textColor={'white'}
                text={'매칭 삭제하기'}
                disabled={false}
                onPress={toNext}
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
              onPress={toNext}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomDetailScreen;

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {
  Camera,
  NaverMapView,
  NaverMapPathOverlay,
} from '@mj-studio/react-native-naver-map';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko'); // 나중에 이 부분 dayjs 따로 빼기ㄴ

import ParticipateUserComponent from '@components/ParticipateUser';
import WaitUserComponent from '@components/WaitUser';
import RoomTagComponent from '@components/RoomDigest/RoomTag';
import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import DescriptionComponent from '@components/Description';
import DottedLineComponent from '@components/DottedLine';

import StartCircle from '@assets/images/Match/StartCircle.svg';
import EndCircle from '@assets/images/Match/EndCircle.svg';
import { CheckRoomDetailResponse } from '@server/responseTypes/room';
import { checkRoomDetail } from '@server/api/room';
import { translateTag } from '@utils/room';

const MatchScreen = () => {
  const [roomId, setRoomId] = useState<number>(15);
  const [roomDetail, setRoomDetail] = useState<CheckRoomDetailResponse>();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  // 다음으로
  const toNext = useCallback(async (): Promise<void> => {
    console.log('ok');
  }, []);

  // initialCamera 는 첫 렌더링 시 카메라 좌표
  // TODO : api 연동 시 출발/도착지의 중앙점으로 카메라 위치
  const initial: Camera = {
    latitude: 37.46504,
    longitude: 126.68045,
    zoom: 16,
  };

  useEffect(() => {
    const fetchRoomDetail = async (roomId: number) => {
      try {
        const data = await checkRoomDetail(roomId);
        setRoomDetail(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoomDetail(roomId);
  }, [roomId]);

  if (roomDetail === undefined) {
    // 일단 react-query 적용전이니 더미데이터 적용
    return (
      <SafeAreaView
        className="flex-1 bg-white"
        edges={['top', 'left', 'right']}
      >
        {/* 헤더 */}
        <HeaderComponent title={'매칭 페이지'} />

        <ScrollView className="flex-1 px-4 mt-8">
          {/* 카테고리 */}
          <View className="flex-row">
            <RoomTagComponent
              label="학생인증"
              textColor="text-main"
              bgColor="bg-sub100"
            />

            <RoomTagComponent
              label="여자만"
              textColor="text-gray500"
              bgColor="bg-box"
            />

            <RoomTagComponent
              label="조용히"
              textColor="text-gray500"
              bgColor="bg-box"
            />
          </View>

          {/* 지도 */}
          <View className="shadow-md">
            <View className="w-full h-[200px] mt-2 bg-sub100 rounded-xl overflow-hidden">
              <NaverMapView
                style={{ flex: 1 }}
                mapType="Basic"
                initialCamera={initial}
                locale="ko"
              >
                <NaverMapPathOverlay
                  coords={[
                    { latitude: 33.5249594, longitude: 126.24180047 },
                    { latitude: 33.25683311547, longitude: 126.18193 },
                    { latitude: 33.3332807, longitude: 126.838389399 },
                  ]}
                  width={8}
                  color={'red'}
                  progress={-0.6}
                  passedColor={'green'}
                />
              </NaverMapView>
            </View>
          </View>

          {/* 날짜, 출발지, 도착지 정보 */}
          <View className="py-8 px-2">
            <View>
              <Text className="text-lg font-medium text-emphasized">
                {dayjs().format('YYYY. MM. DD (ddd)')}
              </Text>
            </View>

            <View className="mt-5">
              <View>
                <View className="flex-row items-center">
                  <StartCircle />

                  <Text className="text-lg text-disabled2 font-normal ml-4">
                    13:35
                  </Text>
                </View>
              </View>

              <View className="flex-row ml-[6px] my-2">
                <View className="w-[1px] h-[46px] bg-main" />

                <Text className="ml-6 text-[20px] font-semibold">
                  인하대학교 후문
                </Text>
              </View>

              <View>
                <View className="flex-row items-center">
                  <EndCircle />

                  <Text className="text-lg text-disabled2 font-normal ml-4">
                    14:00
                  </Text>
                </View>

                <Text className="text-[20px] font-semibold ml-[31px] mt-2">
                  주안역
                </Text>
              </View>
            </View>
          </View>

          {/* 점선 */}
          <DottedLineComponent />

          {/* 방장 */}
          <View className="py-8 px-1">
            <DescriptionComponent description="방장" />

            <ParticipateUserComponent
              nickname={'버스를 놓친 사자'}
              temperature={36.5}
              me={true}
            />
          </View>

          {/* 참여 멤버 */}
          <View className="py-8 px-1">
            <DescriptionComponent description="참여멤버" />

            <ParticipateUserComponent
              nickname={'졸다가 늦은 판다'}
              temperature={36.5}
              me={false}
            />
            <ParticipateUserComponent
              nickname={'버스가 작은 곰'}
              temperature={36.5}
              me={false}
            />
            <ParticipateUserComponent
              nickname={'숏다리 햄스터'}
              temperature={36.5}
              me={false}
            />
          </View>

          {/* 대기 멤버 */}
          <View className="py-8 px-1">
            <DescriptionComponent description="대기멤버" />

            <WaitUserComponent nickname={'남자'} temperature={36.5} />

            <WaitUserComponent nickname={'여자'} temperature={36.5} />
          </View>

          {/* 점선 */}
          <DottedLineComponent />

          {/* 금액 */}
          <View className="py-8">
            <View className="flex-row justify-between">
              <Text className="text-lg text-disabled2 font-medium">총액</Text>
              <Text className="text-lg text-black font-medium">14,450원</Text>
            </View>

            <View className="flex-row justify-between mt-4">
              <Text className="text-lg text-disabled2 font-medium">
                최소인원 매칭시
              </Text>
              <Text className="text-lg text-black font-medium">3,613원</Text>
            </View>
          </View>

          {/* 버튼 */}
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
        </ScrollView>
      </SafeAreaView>
    );
  } else
    return (
      <SafeAreaView
        className="flex-1 bg-white"
        edges={['top', 'left', 'right']}
      >
        {/* 헤더 */}
        <HeaderComponent title={'매칭 페이지'} />

        <ScrollView className="flex-1 px-4 mt-8">
          {/* 카테고리 */}
          <View className="flex-row">
            {roomDetail.roomTagBitMaskList.map(
              (tag, index) =>
                tag && (
                  <RoomTagComponent
                    key={index}
                    label={translateTag(tag)?.label}
                    textColor={translateTag(tag)?.textColor}
                    bgColor={translateTag(tag)?.bgColor}
                  />
                ),
            )}
          </View>

          {/* 지도 */}
          <View className="shadow-md">
            <View className="w-full h-[200px] mt-2 bg-sub100 rounded-xl overflow-hidden">
              <NaverMapView
                style={{ flex: 1 }}
                mapType="Basic"
                initialCamera={initial}
                locale="ko"
              >
                <NaverMapPathOverlay
                  coords={[
                    { latitude: 33.5249594, longitude: 126.24180047 },
                    { latitude: 33.25683311547, longitude: 126.18193 },
                    { latitude: 33.3332807, longitude: 126.838389399 },
                  ]}
                  width={8}
                  color={'red'}
                  progress={-0.6}
                  passedColor={'green'}
                />
              </NaverMapView>
            </View>
          </View>

          {/* 날짜, 출발지, 도착지 정보 */}
          <View className="py-8 px-2">
            <View>
              <Text className="text-lg font-medium text-emphasized">
                {dayjs().format('YYYY. MM. DD (ddd)')}
              </Text>
            </View>

            <View className="mt-5">
              <View>
                <View className="flex-row items-center">
                  <StartCircle />

                  <Text className="text-lg text-disabled2 font-normal ml-4">
                    13:35
                  </Text>
                </View>
              </View>

              <View className="flex-row ml-[6px] my-2">
                <View className="w-[1px] h-[46px] bg-main" />

                <Text className="ml-6 text-[20px] font-semibold">
                  인하대학교 후문
                </Text>
              </View>

              <View>
                <View className="flex-row items-center">
                  <EndCircle />

                  <Text className="text-lg text-disabled2 font-normal ml-4">
                    14:00
                  </Text>
                </View>

                <Text className="text-[20px] font-semibold ml-[31px] mt-2">
                  주안역
                </Text>
              </View>
            </View>
          </View>

          {/* 점선 */}
          <DottedLineComponent />

          {/* 방장 */}
          <View className="py-8 px-1">
            <DescriptionComponent description="방장" />

            <ParticipateUserComponent
              nickname={'버스를 놓친 사자'}
              temperature={36.5}
              me={true}
            />
          </View>

          {/* 참여 멤버 */}
          <View className="py-8 px-1">
            <DescriptionComponent description="참여멤버" />

            <ParticipateUserComponent
              nickname={'졸다가 늦은 판다'}
              temperature={36.5}
              me={false}
            />
            <ParticipateUserComponent
              nickname={'버스가 작은 곰'}
              temperature={36.5}
              me={false}
            />
            <ParticipateUserComponent
              nickname={'숏다리 햄스터'}
              temperature={36.5}
              me={false}
            />
          </View>

          {/* 대기 멤버 */}
          <View className="py-8 px-1">
            <DescriptionComponent description="대기멤버" />

            <WaitUserComponent nickname={'남자'} temperature={36.5} />

            <WaitUserComponent nickname={'여자'} temperature={36.5} />
          </View>

          {/* 점선 */}
          <DottedLineComponent />

          {/* 금액 */}
          <View className="py-8">
            <View className="flex-row justify-between">
              <Text className="text-lg text-disabled2 font-medium">총액</Text>
              <Text className="text-lg text-black font-medium">14,450원</Text>
            </View>

            <View className="flex-row justify-between mt-4">
              <Text className="text-lg text-disabled2 font-medium">
                최소인원 매칭시
              </Text>
              <Text className="text-lg text-black font-medium">3,613원</Text>
            </View>
          </View>

          {/* 버튼 */}
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
        </ScrollView>
      </SafeAreaView>
    );
};

export default MatchScreen;

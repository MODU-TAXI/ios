import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  Camera,
  NaverMapView,
  NaverMapPathOverlay,
  Coord,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko'); // 나중에 이 부분 dayjs 따로 빼기

import { CheckRoomDetailResponse } from '@server/responseTypes/room';
import { translateTag } from '@utils/room';
import { fetchRoomDetail } from '@hooks/api/rooms';
import { fetchSpot } from '@hooks/api/spot';

import ParticipateUserComponent from '@components/ParticipateUser';
import WaitUserComponent from '@components/WaitUser';
import RoomTagComponent from '@components/RoomDigest/RoomTag';
import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import DescriptionComponent from '@components/Description';
import DottedLineComponent from '@components/DottedLine';

import StartCircle from '@assets/images/Match/StartCircle.svg';
import EndCircle from '@assets/images/Match/EndCircle.svg';

const MatchScreen = () => {
  const [roomId, setRoomId] = useState<number>(2);

  const mapRef = useRef<NaverMapViewRef>(null);
  const map = () => mapRef.current;

  // 방 상세 정보 객체
  const [roomDetail, setRoomDetail] = useState<CheckRoomDetailResponse>();

  // 경로 저장 배열
  const [coordinate, setCoordinate] = useState<Coord[]>([]);

  // 도착시간 (계산을 위해 따로 선언)
  const [arrivalTime, setArrivalTime] = useState<Date>();

  // 출발지, 도착거점
  const [departureName, setDepartureName] = useState<string>('');
  const [spotName, setSpotName] = useState<string>('');
  const [spotCoord, setSpotCoord] = useState<Coord>({
    latitude: 37.46504,
    longitude: 126.68045,
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  // 다음으로
  const toNext = useCallback(async (): Promise<void> => {
    console.log('ok');
  }, []);

  // 첫 렌더링 시 카메라 좌표
  const initial: Camera = {
    latitude: 37.46504,
    longitude: 126.68045,
    zoom: 16,
  };

  // roomId 에 따른 매칭방 정보 저장
  useEffect(() => {
    fetchRoomDetail(roomId, setRoomDetail, setCoordinate, setArrivalTime);
  }, [roomId]);

  // 도착 거점 이름, 좌표 저장
  useEffect(() => {
    if (roomDetail) {
      fetchSpot(
        roomDetail.spotId,
        roomDetail.departureLongitude,
        roomDetail.departureLatitude,
        setSpotName,
        setSpotCoord,
      );
    }
  }, [roomDetail]);

  // roomDetail 저장 시 카메라를 출발-도착지 사이로 이동
  useEffect(() => {
    if (roomDetail) {
      map()?.animateCameraWithTwoCoords({
        coord1: {
          latitude: roomDetail.departureLatitude,
          longitude: roomDetail.departureLongitude,
        },
        coord2: {
          latitude: spotCoord.latitude,
          longitude: spotCoord.longitude,
        },
        duration: 500,
      });
    }
  }, [roomDetail]);

  if (roomDetail === undefined) {
    // 일단 react-query 적용전이니 더미데이터 적용
    return (
      <SafeAreaView
        className="flex-1 bg-white"
        edges={['top', 'left', 'right']}
      >
        {/* 헤더 */}
        <HeaderComponent title={'매칭 페이지'} />

        <ScrollView className="flex-1 px-4 mt-8"></ScrollView>
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
          <View className="shadow-md ">
            <View className="w-full h-[200px] mt-2 rounded-xl overflow-hidden">
              <NaverMapView
                style={{ flex: 1 }}
                ref={mapRef}
                mapType="Basic"
                initialCamera={initial}
                locale="ko"
                isShowCompass={false}
                isShowLocationButton={false}
                isShowZoomControls={false}
                // 카메라 고정 -> 뺄 수도 ?
                onCameraChanged={() =>
                  map()?.animateCameraWithTwoCoords({
                    coord1: {
                      latitude: roomDetail.departureLatitude,
                      longitude: roomDetail.departureLongitude,
                    },
                    coord2: {
                      latitude: spotCoord.latitude,
                      longitude: spotCoord.longitude,
                    },
                    duration: 500,
                  })
                }
              >
                {coordinate.length > 2 && (
                  <NaverMapPathOverlay
                    coords={coordinate}
                    width={8}
                    color={'#40CEAC'}
                  />
                )}
              </NaverMapView>
            </View>
          </View>

          {/* 날짜, 출발지, 도착지 정보 */}
          <View className="py-8 px-2">
            <View>
              <Text className="text-lg font-medium text-emphasized">
                {dayjs(roomDetail.departureTime).format('YYYY. MM. DD (ddd)')}
              </Text>
            </View>

            <View className="mt-5">
              <View>
                <View className="flex-row items-center">
                  <StartCircle />

                  <Text className="text-lg text-disabled2 font-normal ml-4">
                    {dayjs(roomDetail.departureTime).format('hh:mm')}
                  </Text>
                </View>
              </View>

              <View className="flex-row ml-[6px] my-2">
                <View className="w-[1px] h-[46px] bg-main" />

                {/** TODO : 방생성 시 주소탐색 구현 -> 여기에는 departureName */}
                <Text className="ml-6 text-[20px] font-semibold">
                  인하대학교 후문
                </Text>
              </View>

              <View>
                <View className="flex-row items-center">
                  <EndCircle />

                  <Text className="text-lg text-disabled2 font-normal ml-4">
                    {dayjs(arrivalTime).format('hh:mm')}
                  </Text>
                </View>

                <Text className="text-[20px] font-semibold ml-[31px] mt-2">
                  {spotName}
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
              <Text className="text-lg text-black font-medium">
                {roomDetail.expectedCharge.toLocaleString('ko-KR')}원
              </Text>
            </View>

            <View className="flex-row justify-between mt-4">
              <Text className="text-lg text-disabled2 font-medium">
                최소인원 매칭시
              </Text>
              <Text className="text-lg text-black font-medium">
                {Math.floor(
                  roomDetail.expectedCharge / (roomDetail.wishHeadcount + 1),
                ).toLocaleString('ko-KR')}
                원
              </Text>
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

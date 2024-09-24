import dayjs from 'dayjs';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, Suspense, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import DatePickerComponent from '@components/DatePicker';
import LoadingComponent from '@components/Common/Loading';
import DescriptionComponent from '@components/Description';
import CategoryComponent from '@components/Match/Category';
import PassengerComponent from '@components/Match/Passenger';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { UserRecoil, CurrentRoomRecoil } from '@recoil/type';
import {
  userRecoilState,
  arrivalRecoilState,
  departureRecoilState,
  currentRoomRecoilState,
} from '@recoil/recoil';

import SuspenseErrorHandler from '@server/errorHandler/suspenseErrorHandler';

import { useCreateRoom } from '@hooks/api/rooms';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { ErrorToastMessage } from '@utils/toastMessage';

import { CreateRoomScreenProps } from '@type/param/loginStack';

import EndCircle from '@assets/images/Match/EndCircle.svg';
import DottedLine from '@assets/images/Match/DottedLine.svg';
import StartCircle from '@assets/images/Match/StartCircle.svg';
import EndGrayCircle from '@assets/images/Match/EndGrayCircle.svg';
import SelectedPerson1 from '@assets/images/Match/SelectedPerson1.svg';
import SelectedPerson2 from '@assets/images/Match/SelectedPerson2.svg';
import SelectedPerson3 from '@assets/images/Match/SelectedPerson3.svg';
import StartGrayCircle from '@assets/images/Match/StartGrayCircle.svg';
import UnSelectedPerson1 from '@assets/images/Match/UnSelectedPerson1.svg';
import UnSelectedPerson2 from '@assets/images/Match/UnSelectedPerson2.svg';
import UnSelectedPerson3 from '@assets/images/Match/UnSelectedPerson3.svg';

dayjs.locale('ko');

const CreateRoomComponent = ({ navigation }: CreateRoomScreenProps) => {
  useDeleteAllNotifee();

  const { mutateAsync: createRoomMutate, isPending: createRoomPending } = useCreateRoom();

  const setCurrentRoomRecoil = useSetRecoilState<CurrentRoomRecoil>(currentRoomRecoilState);
  const [departureRecoil, setDepartureRecoil] = useRecoilState(departureRecoilState); // 출발지 이름, 좌표
  const [arrivalRecoil, setArrivalRecoil] = useRecoilState(arrivalRecoilState); // 도착지 이름, 거점 id
  const [departureTime, setDepartureTime] = useState<Date>(new Date()); // 설정 날짜
  const [datePicked, setDatePicked] = useState<boolean>(false); // 날짜 선택 여부
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false); // Datepicker open 여부
  const [passangersNumber, setPassengersNumber] = useState<number | null>(null); // 탑승 인원
  const [checkedCategories, setCheckedCategories] = useState<boolean[]>([false, false, false]); // 카테고리
  const userRecoil = useRecoilValue<UserRecoil>(userRecoilState);

  /** 출발, 도착지 초기화 */
  const resetRecoilValue = useCallback(() => {
    setDepartureRecoil({
      name: '',
      latitude: 0,
      longitude: 0,
    });
    setArrivalRecoil({
      name: '',
      spotId: 0,
    });
  }, [setDepartureRecoil, setArrivalRecoil]);

  // 파티 생성
  const createMatch = async () => {
    if (!passangersNumber || !datePicked) {
      return ErrorToastMessage('힝목을 모두 체크해주세요');
    }

    const categories = ['STUDENT_CERTIFICATION', 'QUIET'];
    // if (userInfo && userInfo.gender === 'MALE') {
    //   categories[1] = 'ONLY_MAN';
    // }

    const filteredCategories = categories.filter((_, index) => checkedCategories[index]);

    // 개발환경시 기기가 미국이라 9시간 더해주기
    const departureTimeForServer = new Date(departureTime.getTime() + 9 * 60 * 60 * 1000);

    const room = await createRoomMutate({
      spotId: arrivalRecoil.spotId,
      departureLongitude: departureRecoil.longitude,
      departureLatitude: departureRecoil.latitude,
      roomTagBitMask: filteredCategories,
      departureTime: departureTimeForServer,
      departureName: departureRecoil.name,
      wishHeadcount: passangersNumber,
    });

    setCurrentRoomRecoil(room.roomId);

    // 출발지, 도착지 초기화
    resetRecoilValue();

    // stack을 지우며 해당 roomDetail로 이동
    navigation.reset({
      index: 0,
      routes: [
        { name: 'MainScreen' },
        { name: 'RoomDetailScreen', params: { roomId: room.roomId } },
      ],
    });
  };

  // Datepicker open
  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  /** 출발지 선택시 지도 스크린 오픈 */
  const handleDeparture = () => {
    navigation.navigate('DepartureMapScreen');
  };

  /** 도착지 선택시 검색창 오픈 */
  const handleArrival = () => {
    navigation.navigate('ArrivalSearchScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 생성시 로딩 */}
      {createRoomPending && <TransparentLoadingComponent />}

      {/* 헤더 */}
      <HeaderComponent title={'생성 페이지'} resetRecoilValue={resetRecoilValue} />

      <ScrollView className="flex-1 px-4">
        {/* 출발지, 도착지 선택*/}
        <View className="px-2 py-8">
          <DescriptionComponent description="출발지, 도착지를 생성해주세요" />

          <View className="mt-6">
            <Pressable onPress={handleDeparture}>
              <View className="flex-row items-center">
                {departureRecoil.name !== '' ? (
                  <StartCircle width={12} />
                ) : (
                  <StartGrayCircle width={12} />
                )}

                <Text className="ml-4 text-sm font-normal text-gray700">출발지</Text>
              </View>

              <View className="my-2 ml-[6px] flex-row">
                {departureRecoil.name !== '' && arrivalRecoil.name !== '' ? (
                  <View className="h-[43px] w-px bg-main" />
                ) : (
                  <View className="h-[43px] w-px bg-gray300" />
                )}
                <View>
                  {departureRecoil.name === '' ? (
                    <Text className="ml-[21px] text-[16px] font-semibold text-gray300">
                      출발지를 입력해주세요
                    </Text>
                  ) : (
                    <Text className="ml-[21px] text-[16px] font-semibold text-gray900">
                      {departureRecoil.name}
                    </Text>
                  )}
                </View>
              </View>
            </Pressable>

            <Pressable onPress={handleArrival}>
              <View className="flex-row items-center">
                {arrivalRecoil.name !== '' ? (
                  <EndCircle width={12} />
                ) : (
                  <EndGrayCircle width={12} />
                )}
                <Text className="ml-4 text-sm font-normal text-gray700">도착지</Text>
              </View>
              <View>
                {arrivalRecoil.name === '' ? (
                  <Text className="ml-7 pt-2 text-[16px] font-semibold text-gray300">
                    도착지를 입력해주세요
                  </Text>
                ) : (
                  <Text className="ml-7 pt-2 text-[16px] font-semibold text-gray900">
                    {arrivalRecoil.name}
                  </Text>
                )}
              </View>
            </Pressable>
          </View>
        </View>

        {/* 점선 */}
        <DottedLine width="100%" />

        {/* 출발시간설정 */}
        <View className="px-2 py-8">
          <DescriptionComponent description="출발시간을 설정해주세요" />

          <DatePickerComponent
            date={departureTime}
            setDate={setDepartureTime}
            datePicked={datePicked}
            setDatePicked={setDatePicked}
            datePickerOpen={datePickerOpen}
            setDatePickerOpen={setDatePickerOpen}
            openDatePicker={openDatePicker}
            disable={false}
          />
        </View>

        {/* 점선 */}
        <DottedLine width="100%" />

        {/* 탑승 인원 설정 */}
        <View className="px-2 py-8">
          <DescriptionComponent description="최소 탑승 인원을 선택해주세요" />
          <View>
            <Text className="text-sm font-normal text-gray600">
              본인을 제외한 최소 인원을 설정해주세요
            </Text>
          </View>

          {/* 인원 버튼 */}
          <View className="mt-6 flex-row items-center justify-between">
            <PassengerComponent
              index={1}
              unSelectedIcon={<UnSelectedPerson1 />}
              selectedIcon={<SelectedPerson1 />}
              passengersNumber={passangersNumber}
              setPassengersNumber={setPassengersNumber}
            />

            <PassengerComponent
              index={2}
              unSelectedIcon={<UnSelectedPerson2 />}
              selectedIcon={<SelectedPerson2 />}
              passengersNumber={passangersNumber}
              setPassengersNumber={setPassengersNumber}
            />

            <PassengerComponent
              index={3}
              unSelectedIcon={<UnSelectedPerson3 />}
              selectedIcon={<SelectedPerson3 />}
              passengersNumber={passangersNumber}
              setPassengersNumber={setPassengersNumber}
            />
          </View>
        </View>

        {/* 점선 */}
        <DottedLine width="100%" />

        {/* 카테고리 선택 */}
        <View className="px-2 py-8">
          <DescriptionComponent description="카테고리를 선택해주세요" />

          <View className="mt-4 flex-row">
            {userRecoil.email && (
              <CategoryComponent
                index={0}
                category={'학생인증'}
                checkedCategories={checkedCategories}
                setCheckedCategories={setCheckedCategories}
              />
            )}

            <CategoryComponent
              index={1}
              category={'조용히'}
              checkedCategories={checkedCategories}
              setCheckedCategories={setCheckedCategories}
            />
          </View>
        </View>

        {/* 생성 버튼 */}
        <View className="mx-5 mb-10 mt-[78px]">
          <ButtonComponent
            color={'bg-main'}
            borderColor={'border-main'}
            textColor={'white'}
            text={'매칭팟 만들기'}
            disabled={!datePicked || !passangersNumber}
            onPress={createMatch}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CreateRoomScreen = ({ route, navigation }: CreateRoomScreenProps) => {
  return (
    <SuspenseErrorHandler navigation={navigation}>
      <Suspense fallback={<LoadingComponent />}>
        <CreateRoomComponent navigation={navigation} route={route} />
      </Suspense>
    </SuspenseErrorHandler>
  );
};

export default CreateRoomScreen;

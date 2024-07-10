import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, Suspense, useEffect, useCallback } from 'react';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import DatePickerComponent from '@components/DatePicker';
import LoadingComponent from '@components/Common/Loading';
import DescriptionComponent from '@components/Description';
import CategoryComponent from '@components/Match/Category';
import PassengerComponent from '@components/Match/Passenger';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { arrivalState, userInfoState, departureState } from '@recoil/recoil';

import SuspenseErrorHandler from '@server/errorHandler/suspenseErrorHandler';

import { usePatchRoom } from '@hooks/api/rooms';

import { ErrorToastMessage } from '@utils/toastMessage';

import { PatchRoomScreenProps } from '@type/param/loginStack';

import CheckBox from '@assets/images/Match/CheckBox.svg';
import EndCircle from '@assets/images/Match/EndCircle.svg';
import DottedLine from '@assets/images/Match/DottedLine.svg';
import StartCircle from '@assets/images/Match/StartCircle.svg';
import EndGrayCircle from '@assets/images/Match/EndGrayCircle.svg';
import SelectedPerson1 from '@assets/images/Match/SelectedPerson1.svg';
import SelectedPerson2 from '@assets/images/Match/SelectedPerson2.svg';
import SelectedPerson3 from '@assets/images/Match/SelectedPerson3.svg';
import UnSelectedPerson1 from '@assets/images/Match/UnSelectedPerson1.svg';
import UnSelectedPerson2 from '@assets/images/Match/UnSelectedPerson2.svg';
import UnSelectedPerson3 from '@assets/images/Match/UnSelectedPerson3.svg';

dayjs.locale('ko');

const PatchRoomComponent = ({ navigation, route }: PatchRoomScreenProps) => {
  const { roomDetail } = route.params;

  const { mutateAsync: patchRoomMutate, isPending: patchRoomPending } = usePatchRoom(
    roomDetail.roomId,
  );

  const [departure, setDeparture] = useRecoilState(departureState); // 출발지 이름, 좌표
  const [arrival, setArrival] = useRecoilState(arrivalState); // 도착지 이름, 거점 id
  const [departureTime, setDepartureTime] = useState<Date>(new Date()); // 설정 날짜
  const [datePicked, setDatePicked] = useState<boolean>(true); // 날짜 선택 여부
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false); // Datepicker open 여부
  const [passengersNumber, setPassengersNumber] = useState<number | null>(
    roomDetail.wishHeadcount - 1,
  ); // 탑승 인원
  const [checkedCategories, setCheckedCategories] = useState<boolean[]>([false, false, false]); // 카테고리
  const [userInfo] = useRecoilState(userInfoState);

  // 첫 렌더링 시 roomDetail 정보 저장
  useEffect(() => {
    setDeparture({
      name: roomDetail.departureName,
      latitude: roomDetail.departureLatitude,
      longitude: roomDetail.departureLongitude,
    });
    setArrival({
      name: roomDetail.arrivalName,
      spotId: roomDetail.spotId,
    });
  }, [])

  // 날짜 다시 활성화
  useEffect(() => {
    const splitDate = roomDetail.departureDairyDate.split('.');
    const splitTime = roomDetail.departureTime.split(':');
    const dateObj = new Date();
    const realDate = splitDate[2].split(' ')[0];

    dateObj.setFullYear(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(realDate));
    dateObj.setHours(parseInt(splitTime[0]));
    dateObj.setMinutes(parseInt(splitTime[1]));

    setDepartureTime(dateObj);
  }, []);

  // 카테고리 선택했던 것들 활성화
  useEffect(() => {
    const origin_categories = ['학생인증', '여자만', '조용히'];
    if (userInfo && userInfo.gender === 'MALE') {
      origin_categories[1] = '남자만';
    }

    const selected_indexs = roomDetail.roomCategories.map((roomCategory) => {
      return origin_categories.indexOf(roomCategory.trim());
    });

    selected_indexs.map((selected_index) => (checkedCategories[selected_index] = true));

    const new_categories = [...checkedCategories];

    setCheckedCategories(new_categories);
  }, []);

  // 파티 수정
  const patchMatch = async () => {
    if (!passengersNumber || !datePicked) {
      return ErrorToastMessage('힝목을 모두 체크해주세요');
    }

    const categories = ['STUDENT_CERTIFICATION', 'ONLY_WOMAN', 'QUIET'];
    if (userInfo && userInfo.gender === 'MALE') {
      categories[1] = 'ONLY_MAN';
    }

    const filteredCategories = categories.filter((_, index) => checkedCategories[index]);

    // 개발환경시 기기가 미국이라 9시간 더해주기
    const departureTimeForServer = new Date(departureTime.getTime() + 9 * 60 * 60 * 1000);

    await patchRoomMutate({
      spotId: arrival.spotId,
      departureLongitude: departure.longitude,
      departureLatitude: departure.latitude,
      roomTagBitMask: filteredCategories,
      departureTime: departureTimeForServer,
      departureName: departure.name,
      wishHeadcount: passengersNumber,
    });

    resetRecoilValue();

    // stack을 지우며 해당 roomDetail로 이동
    navigation.reset({
      index: 0,
      routes: [
        { name: 'MainScreen' },
        { name: 'RoomDetailScreen', params: { roomId: roomDetail.roomId } },
      ],
    });
  };

  // Datepicker open
  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  // TODO : 서버 연동 시 검색한 거점명 받아서 start, destination 저장 비동기 처리
  /** 출발지 선택시 검색창 오픈 */
  const handleDeparture = () => {
    navigation.navigate('DepartureMapScreen', { roomDetail: roomDetail });
  };

  /** 도착지 선택시 검색창 오픈 */
  const handleArrival = () => {
    navigation.navigate('ArrivalSearchScreen', { isPatch: true });
  };

  /** 출발, 도착지 초기화 */
  const resetRecoilValue = useCallback(() => {
    setDeparture({
      name: '',
      latitude: 0,
      longitude: 0,
    });
    setArrival({
      name: '',
      spotId: 0,
    });
  }, [setDeparture, setArrival]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 수정시 로딩 */}
      {patchRoomPending && <TransparentLoadingComponent />}

      {/* 헤더 */}
      <HeaderComponent title={'수정 페이지'} resetRecoilValue={resetRecoilValue} />

      <ScrollView className="flex-1 px-4">
        {/* 출발지, 도착지 선택*/}
        <View className="px-2 py-8">
          <DescriptionComponent description="출발지, 도착지를 생성해주세요" />

          <View className="mt-6">
            <View>
              <View className="flex-row items-center">
                <StartCircle />

                <Text className="ml-4 text-sm font-normal text-gray700">출발지</Text>
              </View>
            </View>

            <View className="my-2 ml-[6px] flex-row">
              <View className="h-[46px] w-px bg-main" />
              <Pressable onPress={handleDeparture}>
                {departure.name === '' ? (
                  <Text className="ml-6 text-[16px] font-semibold text-gray900 ">
                    {roomDetail.departureName}
                  </Text>
                ) : (
                  <Text className="ml-6 text-[16px] font-semibold text-gray900 ">
                    {departure.name}
                  </Text>
                )}
              </Pressable>
            </View>

            <View>
              <View className="flex-row items-center">
                <EndCircle width={12} />
                <Text className="ml-4 text-sm font-normal text-gray700">도착지</Text>
              </View>

              <Pressable onPress={handleArrival}>
                {arrival.name === '' ? (
                  <Text className="ml-[31px] mt-2 text-[16px] font-semibold text-gray900 ">
                    {roomDetail.arrivalName}
                  </Text>
                ) : (
                  <Text className="ml-[31px] mt-2 text-[16px] font-semibold text-gray900 ">
                    {arrival.name}
                  </Text>
                )}
              </Pressable>
            </View>
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
              passengersNumber={passengersNumber}
              setPassengersNumber={setPassengersNumber}
            />

            <PassengerComponent
              index={2}
              unSelectedIcon={<UnSelectedPerson2 />}
              selectedIcon={<SelectedPerson2 />}
              passengersNumber={passengersNumber}
              setPassengersNumber={setPassengersNumber}
            />

            <PassengerComponent
              index={3}
              unSelectedIcon={<UnSelectedPerson3 />}
              selectedIcon={<SelectedPerson3 />}
              passengersNumber={passengersNumber}
              setPassengersNumber={setPassengersNumber}
            />
          </View>
        </View>

        {/* 점선 */}
        <DottedLine width="100%" />

        {/* 카테고리 선택 */}
        <View className="px-2 py-8">
          <DescriptionComponent description="카테고리를 선택해주세요" />

          <View className="mt-4 flex-row justify-between">
            {userInfo.email ? (
              <CategoryComponent
                index={0}
                category={'학생인증'}
                checkedCategories={checkedCategories}
                setCheckedCategories={setCheckedCategories}
              />
            ) : (
              <Pressable
                disabled
                className="flex-row items-center justify-center rounded-xl border-2 border-gray200 px-3 py-2"
              >
                <CheckBox className="mr-2" />
                <Text className="text-sm font-normal text-gray700">학생인증</Text>
              </Pressable>
            )}

            {userInfo.gender === 'MALE' ? (
              <CategoryComponent
                index={1}
                category={'남자만'}
                checkedCategories={checkedCategories}
                setCheckedCategories={setCheckedCategories}
              />
            ) : (
              <CategoryComponent
                index={1}
                category={'여자만'}
                checkedCategories={checkedCategories}
                setCheckedCategories={setCheckedCategories}
              />
            )}

            <CategoryComponent
              index={2}
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
            text={'매칭팟 수정하기'}
            disabled={!datePicked || !passengersNumber}
            onPress={patchMatch}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PatchRoomScreen = ({ route, navigation }: PatchRoomScreenProps) => {
  return (
    <SuspenseErrorHandler navigation={navigation}>
      <Suspense fallback={<LoadingComponent />}>
        <PatchRoomComponent navigation={navigation} route={route} />
      </Suspense>
    </SuspenseErrorHandler>
  );
};

export default PatchRoomScreen;

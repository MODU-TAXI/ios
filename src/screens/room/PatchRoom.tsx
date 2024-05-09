import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePickerComponent from '@components/DatePicker';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import HeaderComponent from '@components/Header';
import DescriptionComponent from '@components/Description';
import ButtonComponent from '@components/Button';
import DottedLineComponent from '@components/DottedLine';
import PassengerComponent from '@components/Match/Passenger';
import CategoryComponent from '@components/Match/Category';
import { LoginStackParamList } from '@type/ParamLists';
import { ErrorToastMessage } from '@utils/toastMessage';
import { usePatchRoom } from '@hooks/api/rooms';

import StartCircle from '@assets/images/Match/StartCircle.svg';
import EndGrayCircle from '@assets/images/Match/EndGrayCircle.svg';
import EndCircle from '@assets/images/Match/EndCircle.svg';

import SelectedPerson1 from '@assets/images/Match/SelectedPerson1.svg';
import SelectedPerson2 from '@assets/images/Match/SelectedPerson2.svg';
import SelectedPerson3 from '@assets/images/Match/SelectedPerson3.svg';
import UnSelectedPerson1 from '@assets/images/Match/UnSelectedPerson1.svg';
import UnSelectedPerson2 from '@assets/images/Match/UnSelectedPerson2.svg';
import UnSelectedPerson3 from '@assets/images/Match/UnSelectedPerson3.svg';
import dayjs from 'dayjs';

dayjs.locale('ko');

const PatchRoom = () => {
  const navigation = useNavigation<NavigationProp<LoginStackParamList>>();
  const route = useRoute<RouteProp<LoginStackParamList>>();
  const roomDetail = route?.params?.roomDetail;

  // TODO: 이부분 어떻게 할지 고민하기
  if (!roomDetail) {
    throw new Error('존재하지 않는 방 정보');
  }

  const { mutateAsync: patchRoomMutate } = usePatchRoom(roomDetail.roomId);

  const [start, setStart] = useState<string>(roomDetail.departureName); // 출발지
  const [end, setEnd] = useState<string>(roomDetail.arrivalName); // 도착지
  const [departureTime, setDepartureTime] = useState<Date>(new Date()); // 설정 날짜
  const [datePicked, setDatePicked] = useState<boolean>(true); // 날짜 선택 여부
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false); // Datepicker open 여부
  const [passangersNumber, setPassengersNumber] = useState<number | null>(
    roomDetail.wishHeadcount,
  ); // 탑승 인원
  const [checkedCategorys, setCheckedCategorys] = useState<boolean[]>([
    false,
    false,
    false,
  ]); // 카테고리

  // 날짜 다시 활성화
  useEffect(() => {
    const splitTime = roomDetail.departureTime.split(':');
    const dateObj = new Date();
    dateObj.setHours(parseInt(splitTime[0]));
    dateObj.setMinutes(parseInt(splitTime[1]));
    setDepartureTime(dateObj);
  }, []);

  // 카테고리 선택했던 것들 활성화
  useEffect(() => {
    const origin_categories = ['학생인증', '여자만', '매너탑승'];

    const selected_indexs = roomDetail.roomCategories.map((roomCategory) => {
      return origin_categories.indexOf(roomCategory.trim());
    });

    selected_indexs.map(
      (selected_index) => (checkedCategorys[selected_index] = true),
    );

    const new_categories = [...checkedCategorys];

    setCheckedCategorys(new_categories);
  }, []);

  // 파티 수정
  const patchMatch = async () => {
    if (!passangersNumber || !datePicked) {
      return ErrorToastMessage('힝목을 모두 체크해주세요');
    }

    const categories = ['STUDENT_CERTIFICATION', 'ONLY_WOMAN', 'MANNER'];

    const filteredCategories = categories.filter(
      (_, index) => checkedCategorys[index],
    );

    // 개발환경시 기기가 미국이라 9시간 더해주기
    departureTime.setHours(departureTime.getHours() + 9);

    await patchRoomMutate({
      spotId: 1,
      departureLongitude: 126.69487873676,
      departureLatitude: 37.463182225352,
      roomTagBitMask: filteredCategories,
      departureTime: departureTime,
      departureName: '주안역',
      wishHeadcount: passangersNumber,
    });

    // 다시 매칭 페이지로 이동
    return navigation.navigate('RoomDetailScreen');
  };

  // Datepicker open
  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  // TODO : 서버 연동 시 검색한 거점명 받아서 start, destination 저장 비동기 처리
  /** 출발지 선택시 검색창 오픈 */
  const handleStart = () => {
    navigation.navigate('SearchScreen');
    setStart('인하대학교 후문');
  };

  /** 도착지 선택시 검색창 오픈 */
  const handleEnd = () => {
    navigation.navigate('SearchScreen');
    setEnd('주안역');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 헤더 */}
      <HeaderComponent title={'수정 페이지'} />

      <ScrollView className="flex-1 px-4">
        {/* 출발지, 도착지 선택*/}
        <View className="py-8 px-2">
          <DescriptionComponent description="출발지, 도착지를 생성해주세요" />

          <View className="mt-6">
            <View>
              <View className="flex-row items-center">
                <StartCircle />

                <Text className="text-sm text-gray700 font-normal ml-4">
                  출발지
                </Text>
              </View>
            </View>

            <View className="flex-row ml-[6px] my-2">
              {start && end ? (
                <View className="w-[1px] h-[46px] bg-main" />
              ) : (
                <View className="w-[1px] h-[46px] bg-gray300" />
              )}
              <Pressable onPress={handleStart}>
                {start ? (
                  <Text className="ml-6 text-[20px] text-gray900 font-semibold ">
                    {start}
                  </Text>
                ) : (
                  <Text className="ml-6 text-[20px] text-gray300 font-semibold ">
                    출발지를 선택해주세요
                  </Text>
                )}
              </Pressable>
            </View>

            <View>
              <View className="flex-row items-center">
                {end ? <EndCircle /> : <EndGrayCircle />}
                <Text className="text-sm text-gray700 font-normal ml-4">
                  도착지
                </Text>
              </View>

              <Pressable onPress={handleEnd}>
                {end ? (
                  <Text className="ml-[31px] mt-2 text-[20px] text-gray900 font-semibold ">
                    {end}
                  </Text>
                ) : (
                  <Text className="ml-[31px] mt-2 text-[20px] text-gray300 font-semibold ">
                    도착지를 선택해주세요
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>

        {/* 점선 */}
        <DottedLineComponent />

        {/* 출발시간설정 */}
        <View className="py-8 px-2">
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
        <DottedLineComponent />

        {/* 탑승 인원 설정 */}
        <View className="py-8 px-2">
          <DescriptionComponent description="최소 탑승 인원을 선택해주세요" />
          <View>
            <Text className="text-sm text-gray600 font-normal">
              본인을 제외한 최소 인원을 설정해주세요
            </Text>
          </View>

          {/* 인원 버튼 */}
          <View className="flex-row justify-between items-center mt-6">
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
        <DottedLineComponent />

        {/* 카테고리 선택 */}
        <View className="py-8 px-2">
          <DescriptionComponent description="카테고리를 선택해주세요" />

          <View className="flex-row justify-between mt-4">
            <CategoryComponent
              index={0}
              category={'학생인증'}
              checkedCategorys={checkedCategorys}
              setCheckedCategorys={setCheckedCategorys}
            />
            <CategoryComponent
              index={1}
              category={'여자만'}
              checkedCategorys={checkedCategorys}
              setCheckedCategorys={setCheckedCategorys}
            />
            <CategoryComponent
              index={2}
              category={'매너탑승'}
              checkedCategorys={checkedCategorys}
              setCheckedCategorys={setCheckedCategorys}
            />
          </View>
        </View>

        {/* 생성 버튼 */}
        <View className="mt-[78px] mx-5 mb-10">
          <ButtonComponent
            color={'bg-main'}
            borderColor={'border-main'}
            textColor={'white'}
            text={'매칭팟 수정하기'}
            disabled={!datePicked || !passangersNumber}
            onPress={patchMatch}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatchRoom;

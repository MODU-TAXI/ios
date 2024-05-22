import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useChatContext } from 'src/providers/chatProvider';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import DatePickerComponent from '@components/DatePicker';
import DottedLineComponent from '@components/DottedLine';
import LoadingComponent from '@components/Common/Loading';
import DescriptionComponent from '@components/Description';
import CategoryComponent from '@components/Match/Category';
import PassengerComponent from '@components/Match/Passenger';

import { roomState } from '@recoil/recoil';

import { useCreateRoom } from '@hooks/api/rooms';

import { ErrorToastMessage } from '@utils/toastMessage';

import { CreateRoomScreenProps } from '@type/param/loginStack';

import EndCircle from '@assets/images/Match/EndCircle.svg';
import StartCircle from '@assets/images/Match/StartCircle.svg';
import EndGrayCircle from '@assets/images/Match/EndGrayCircle.svg';
import SelectedPerson1 from '@assets/images/Match/SelectedPerson1.svg';
import SelectedPerson2 from '@assets/images/Match/SelectedPerson2.svg';
import SelectedPerson3 from '@assets/images/Match/SelectedPerson3.svg';
import StartGrayCircle from '@assets/images/Match/StartGrayCircle.svg';
import UnSelectedPerson1 from '@assets/images/Match/UnSelectedPerson1.svg';
import UnSelectedPerson2 from '@assets/images/Match/UnSelectedPerson2.svg';
import UnSelectedPerson3 from '@assets/images/Match/UnSelectedPerson3.svg';

const CreateRoomScreen = ({ navigation }: CreateRoomScreenProps) => {
  const { mutateAsync: createRoomMutate, isPending } = useCreateRoom();

  const [, setSocketRoomId] = useRecoilState(roomState);
  const [start, setStart] = useState<string>(''); // 출발지
  const [end, setEnd] = useState<string>(''); // 도착지
  const [departureTime, setDepartureTime] = useState<Date>(new Date()); // 설정 날짜
  const [datePicked, setDatePicked] = useState<boolean>(false); // 날짜 선택 여부
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false); // Datepicker open 여부
  const [passangersNumber, setPassengersNumber] = useState<number | null>(null); // 탑승 인원
  const [checkedCategorys, setCheckedCategorys] = useState<boolean[]>([false, false, false]); // 카테고리
  const { connect } = useChatContext();

  // 파티 생성
  const createMatch = async () => {
    if (!passangersNumber || !datePicked) {
      return ErrorToastMessage('힝목을 모두 체크해주세요');
    }

    const categories = ['STUDENT_CERTIFICATION', 'ONLY_WOMAN', 'MANNER'];

    const filteredCategories = categories.filter((_, index) => checkedCategorys[index]);

    // 개발환경시 기기가 미국이라 9시간 더해주기
    departureTime.setHours(departureTime.getHours() + 9);

    const room = await createRoomMutate({
      spotId: 1,
      departureLongitude: 126.69487873676,
      departureLatitude: 37.463182225352,
      roomTagBitMask: filteredCategories,
      departureTime: departureTime,
      departureName: '주안역',
      wishHeadcount: passangersNumber,
    });

    connect(room.roomId);
    setSocketRoomId(room.roomId);
    return navigation.navigate('HomeScreen');
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
    <SafeAreaView className="flex-1 bg-white">
      {/* 헤더 */}
      <HeaderComponent title={'생성 페이지'} />

      <ScrollView className="flex-1 px-4 ">
        {isPending && <LoadingComponent />}

        {/* 출발지, 도착지 선택*/}
        <View className="px-2 py-8">
          <DescriptionComponent description="출발지, 도착지를 생성해주세요" />

          <View className="mt-6">
            <View>
              <View className="flex-row items-center">
                {start ? <StartCircle /> : <StartGrayCircle />}

                <Text className="ml-4 text-sm font-normal text-gray700">출발지</Text>
              </View>
            </View>

            <View className="my-2 ml-[6px] flex-row">
              {start && end ? (
                <View className="h-[46px] w-px bg-main" />
              ) : (
                <View className="h-[46px] w-px bg-gray300" />
              )}
              <Pressable onPress={handleStart}>
                {start ? (
                  <Text className="ml-6 text-[20px] font-semibold text-gray900 ">{start}</Text>
                ) : (
                  <Text className="ml-6 text-[20px] font-semibold text-gray300 ">
                    출발지를 선택해주세요
                  </Text>
                )}
              </Pressable>
            </View>

            <View>
              <View className="flex-row items-center">
                {end ? <EndCircle /> : <EndGrayCircle />}
                <Text className="ml-4 text-sm font-normal text-gray700">도착지</Text>
              </View>

              <Pressable onPress={handleEnd}>
                {end ? (
                  <Text className="ml-[31px] mt-2 text-[20px] font-semibold text-gray900 ">
                    {end}
                  </Text>
                ) : (
                  <Text className="ml-[31px] mt-2 text-[20px] font-semibold text-gray300 ">
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
        <DottedLineComponent />

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
        <DottedLineComponent />

        {/* 카테고리 선택 */}
        <View className="px-2 py-8">
          <DescriptionComponent description="카테고리를 선택해주세요" />

          <View className="mt-4 flex-row justify-between">
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

export default CreateRoomScreen;

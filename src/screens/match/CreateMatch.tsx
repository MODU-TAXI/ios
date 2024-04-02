import React, { useCallback, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

import HeaderComponent from '@components/Header';
import DescriptionComponent from '@components/Description';
import ButtonComponent from '@components/Button';
import DottedLineComponent from '@components/DottedLine';

import StartGrayCircle from '@assets/images/Match/StartGrayCircle.svg';
import EndGrayCircle from '@assets/images/Match/EndGrayCircle.svg';
import Person1 from '@assets/images/Match/Person1.svg';
import Person2 from '@assets/images/Match/Person2.svg';
import Person3 from '@assets/images/Match/Person3.svg';
import SelectedPerson1 from '@assets/images/Match/SelectedPerson1.svg';
import SelectedPerson2 from '@assets/images/Match/SelectedPerson2.svg';
import SelectedPerson3 from '@assets/images/Match/SelectedPerson3.svg';
import CheckBox from '@assets/images/Match/CheckBox.svg';
import SelectedCheckBox from '@assets/images/Match/SelectedCheckBox.svg';
import DatePickerComponent from '@components/DatePicker';

interface IconProps {
  icon: JSX.Element;
}

interface SelectedIconProps {
  selectedIcon: JSX.Element;
}

const CreateMatchScreen = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [datePicked, setDatePicked] = useState<boolean>(false);
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [passangersNumber, setPassengersNumber] = useState<number | null>(null);
  const [checkedCategorys, setCheckedCategorys] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  // 다음으로
  const toNext = useCallback(async (): Promise<void> => {
    console.log('ok');
  }, []);

  const handlePress = (index: number) => {
    setPassengersNumber(index);
  };

  const passengers = (
    index: number,
    { icon }: IconProps,
    { selectedIcon }: SelectedIconProps,
  ) => {
    const isSelected = passangersNumber === index;

    const px = index === 1 ? 'px-[26px]' : index === 2 ? 'px-4' : '[6px]';

    return (
      <View>
        {isSelected ? (
          <Pressable
            key={index}
            onPress={() => handlePress(index)}
            className={`flex-col items-center border-[1px] border-main ${px} py-3 rounded-full`}
          >
            {selectedIcon}
            <Text className="mt-1 text-main">{index}명</Text>
          </Pressable>
        ) : (
          <Pressable
            key={index}
            onPress={() => handlePress(index)}
            className={`flex-col items-center border-[1px] border-gray200 ${px} py-3 rounded-full`}
          >
            {icon}
            <Text className="mt-1 text-gray400">{index}명</Text>
          </Pressable>
        )}
      </View>
    );
  };

  const selectCategory = (index: number) => {
    setCheckedCategorys((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const categorys = (index: number, category: string) => {
    const checked = checkedCategorys[index];
    return (
      <View>
        {checked ? (
          <Pressable
            onPress={() => selectCategory(index)}
            className="flex-row items-center justify-center border-2 border-main px-3 py-2 rounded-xl"
          >
            <SelectedCheckBox className="mr-2" />
            <Text className="text-sm font-normal text-main">{category}</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => selectCategory(index)}
            className="flex-row items-center justify-center border-2 border-gray200 px-3 py-2 rounded-xl"
          >
            <CheckBox className="mr-2" />
            <Text className="text-sm font-normal text-gray700">{category}</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
      {/* 헤더 */}
      <HeaderComponent title={'생성 페이지'} />

      <ScrollView className="flex-1 px-4">
        {/* 출발지, 도착지 선택*/}
        <View className="py-8 px-2">
          <DescriptionComponent description="출발지, 도착지를 생성해주세요" />

          <View className="mt-6">
            <View>
              <View className="flex-row items-center">
                <StartGrayCircle />
                <Text className="text-sm text-gray700 font-normal ml-4">
                  출발지
                </Text>
              </View>
            </View>

            <View className="flex-row ml-[6px] my-2">
              <View className="w-[1px] h-[46px] bg-gray300" />

              <Text className="ml-6 text-[20px] text-gray300 font-semibold ">
                출발지를 선택해주세요
              </Text>
            </View>

            <View>
              <View className="flex-row items-center">
                <EndGrayCircle />

                <Text className="text-sm text-gray700 font-normal ml-4">
                  도착지
                </Text>
              </View>

              <Text className="text-[20px] font-semibold text-gray300 ml-8 mt-2">
                도착지를 선택해주세요
              </Text>
            </View>
          </View>
        </View>

        {/* 점선 */}
        <DottedLineComponent />

        {/* 출발시간설정 */}
        <View className="py-8 px-2">
          <DescriptionComponent description="출발시간을 설정해주세요" />

          <DatePickerComponent
            date={date}
            setDate={setDate}
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
            {passengers(
              1,
              { icon: <Person1 /> },
              { selectedIcon: <SelectedPerson1 /> },
            )}
            {passengers(
              2,
              { icon: <Person2 /> },
              { selectedIcon: <SelectedPerson2 /> },
            )}
            {passengers(
              3,
              { icon: <Person3 /> },
              { selectedIcon: <SelectedPerson3 /> },
            )}
          </View>
        </View>

        {/* 점선 */}
        <DottedLineComponent />

        {/* 카테고리 선택 */}
        <View className="py-8 px-2">
          <DescriptionComponent description="카테고리를 선택해주세요" />

          <View className="flex-row justify-between mt-4">
            {categorys(0, '학생인증')}
            {categorys(1, '여자만')}
            {categorys(2, '매너탑승')}
          </View>
        </View>

        {/* 생성 버튼 */}
        <View className="mt-[78px] mx-5 mb-10">
          <ButtonComponent
            color={'bg-main'}
            text={'매칭팟 만들기'}
            textColor={'white'}
            onPress={toNext}
            disabled={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMatchScreen;

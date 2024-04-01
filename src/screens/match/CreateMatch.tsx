import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

import HeaderComponent from '@components/Header';
import DescriptionComponent from '@components/Description';
import ButtonComponent from '@components/Button';

import StartGrayCircle from '@assets/images/Match/StartGrayCircle.svg';
import EndGrayCircle from '@assets/images/Match/EndGrayCircle.svg';
import Person1 from '@assets/images/Match/Person1.svg';
import Person2 from '@assets/images/Match/Person2.svg';
import Person3 from '@assets/images/Match/Person3.svg';
import CheckBox from '@assets/images/Match/CheckBox.svg';

const CreateMatchScreen = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [datePick, setDatePick] = useState<boolean>(false);
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  useEffect(() => {
    console.log(date.toString());
  }, [date]);

  // 다음으로
  const toNext = useCallback(async (): Promise<void> => {
    console.log('ok');
  }, []);

  return (
    <SafeAreaView className="flex-1">
      {/* 헤더 */}
      <HeaderComponent title={'생성 페이지'} />

      <ScrollView className="flex-1 px-4">
        {/* 출발지, 도착지 선택*/}
        <View className="py-8 px-2">
          <DescriptionComponent description="출발지, 도착지를 생성해주세요" />

          <View className="mt-5">
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
                인하대학교 후문
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
                주안역
              </Text>
            </View>
          </View>
        </View>

        {/* 점선 */}
        <View className="w-full border-dashed border-[1px] border-gray200" />

        {/* 출발시간설정 */}
        <View className="py-8 px-2">
          <DescriptionComponent description="출발시간을 설정해주세요" />
          {datePick ? (
            <Pressable
              className="mt-4 py-3 px-4 border-2 border-main rounded-xl"
              onPress={openDatePicker}
            >
              <Text className="font-medium text-base text-emphasized">
                {dayjs().format('YYYY년 MM월 DD일')}
              </Text>
              <Text className="mt-1 text-lg text-main font-semibold">
                {dayjs(date)
                  .format('A HH시 mm분')
                  .replace('AM', '오전')
                  .replace('PM', '오후')}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              className="mt-4 py-3 px-4 border-2 border-disabled rounded-xl"
              onPress={openDatePicker}
            >
              <Text className="font-medium text-base text-emphasized">
                {dayjs().format('YYYY년 MM월 DD일')}
              </Text>
              <Text className="mt-1 text-lg text-gray300">
                출발시간을 설정해주세요
              </Text>
            </Pressable>
          )}

          <DatePicker
            modal
            open={datePickerOpen}
            date={date}
            mode="time"
            onConfirm={(date) => {
              setDatePickerOpen(false);
              setDate(date);
              setDatePick(true);
            }}
            onCancel={() => {
              setDatePickerOpen(false);
            }}
          />
        </View>

        {/* 탑승 인원 설정 */}
        <View className="py-8 px-2">
          <DescriptionComponent description="출발시간을 설정해주세요" />
          <View>
            <Text className="text-sm text-gray600 font-normal">
              본인을 제외한 최소 인원을 설정해주세요
            </Text>
          </View>

          {/* 인원 버튼 */}
          <View className="flex-row justify-between items-center mt-6">
            <Pressable className="flex-col items-center border-2 border-gray200 px-[26px] py-3 rounded-full">
              <Person1 />
              <Text className="mt-1 text-gray400">1명</Text>
            </Pressable>

            <Pressable className="flex-col items-center border-2 border-gray200 px-4 py-3 rounded-full">
              <Person2 />
              <Text className="mt-1 text-gray400">2명</Text>
            </Pressable>

            <Pressable className="flex-col items-center border-2 border-gray200 px-[6px] py-3 rounded-full">
              <Person3 />
              <Text className="mt-1 text-gray400">3명</Text>
            </Pressable>
          </View>
        </View>

        {/* 점선 */}
        <View className="w-full border-dashed border-[1px] border-gray200" />

        {/* 카테고리 선택 */}
        <View className="py-8 px-2">
          <DescriptionComponent description="카테고리를 선택해주세요" />

          <View className="flex-row justify-between mt-4">
            <View className="flex-row items-center justify-center border-2 border-gray200 px-4 py-2 rounded-xl">
              <CheckBox className="mr-2" />
              <Text className="text-sm font-normal text-gray700">학생인증</Text>
            </View>

            <View className="flex-row items-center justify-center border-2 border-gray200 px-4 py-2 rounded-xl">
              <CheckBox className="mr-2" />
              <Text className="text-sm font-normal text-gray700">여자만</Text>
            </View>

            <View className="flex-row items-center justify-center border-2 border-gray200 px-4 py-2 rounded-xl">
              <CheckBox className="mr-2" />
              <Text className="text-sm font-normal text-gray700">매너탑승</Text>
            </View>
          </View>
        </View>

        {/* 생성 버튼 */}
        <View className="mt-[78px] mx-6 mb-10">
          <ButtonComponent
            color={'bg-main'}
            text={'매칭 생성하기'}
            textColor={'white'}
            onPress={toNext}
            disabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMatchScreen;

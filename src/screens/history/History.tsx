import { Text, View, Pressable } from 'react-native';
import React, { useState, useCallback } from 'react';
import MonthPicker from 'react-native-month-year-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import LoadingComponent from '@components/Common/Loading';
import HistoryInfoComponent from '@components/History/HistoryInfo';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { useGetHistoryDuration, useGetHistoriesByMonth } from '@hooks/api/history';

import { HistoryPreview } from '@type/entity/history';
import { HistoryScreenProps } from '@type/param/loginStack';

import AfterBar from '@assets/images/History/AfterBar.svg';
import DropDown from '@assets/images/History/DropDown.svg';
import BeforeBar from '@assets/images/History/BeforeBar.svg';

const HistoryScreen = ({ navigation }: HistoryScreenProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const showPicker = useCallback((value: boolean) => setShow(value), []);

  const onValueChange = useCallback(
    async (event: any, newDate?: Date | undefined) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
      await getHistoriesRefetch();
    },
    [date, showPicker],
  );

  const {
    data: histories,
    refetch: getHistoriesRefetch,
    isPending: getHistoriesPending,
  } = useGetHistoriesByMonth(year, month);

  const { data: historyDuration, isPending: historyDurationPending } = useGetHistoryDuration();

  const toHistoryDetailScreen = (historyId: number) => {
    showPicker(false);
    navigation.navigate('HistoryDetailScreen', { historyId: historyId });
  };

  if (!histories || !historyDuration) return <LoadingComponent />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="이용내역" />

      {(getHistoriesPending || historyDurationPending) && <TransparentLoadingComponent />}

      <View className="mt-6 px-5">
        <Pressable className="flex-row items-center" onPress={() => showPicker(true)}>
          <Text className="mr-1 text-[20px] font-semibold tracking-tight text-[#9C9C9C]">
            {year}년 {month}월
          </Text>

          <DropDown />
        </Pressable>

        <View className="mt-6">
          <Text className="text-[16px] font-medium tracking-tight text-[#9C9C9C]">
            이번달 아낀 택시비
          </Text>
          <Text className="text-[28px] font-semibold tracking-tight text-main">
            {(histories.accumulateTotalCharge - histories.accumulatePortionCharge).toLocaleString(
              'ko-KR',
            )}
            원
          </Text>
        </View>

        <View className="mt-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="mr-4 text-[12px] font-medium tracking-tight text-[#7C7C7C]">
                모택이용전
              </Text>

              <BeforeBar />
            </View>

            <Text className="text-[12px] font-medium tracking-tight text-[#3E3E3E]">
              {histories.accumulateTotalCharge.toLocaleString('ko-KR')}원
            </Text>
          </View>

          <View className="mt-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="mr-4 text-[12px] font-medium tracking-tight text-[#7C7C7C]">
                모택이용후
              </Text>

              <AfterBar />
            </View>

            <Text className="text-[12px] font-medium tracking-tight text-[#3E3E3E]">
              {histories.accumulatePortionCharge.toLocaleString('ko-KR')}원
            </Text>
          </View>
        </View>
      </View>

      <View className="my-7 h-2 w-full bg-[#F8FAF9]" />

      <ScrollView className="px-4">
        <View className="mb-1 px-2">
          <Text className="font-medium tracking-tight text-[#9C9C9C]">이용내역</Text>
        </View>

        {histories.historySimpleListResponse.map((history: HistoryPreview) => (
          <HistoryInfoComponent
            key={history.historyId}
            history={history}
            toHistoryDetailScreen={toHistoryDetailScreen}
          />
        ))}
      </ScrollView>

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date(historyDuration.startDate)}
          maximumDate={new Date(historyDuration.endDate)}
          locale="ko"
          okButton="확인"
          cancelButton="취소"
        />
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;

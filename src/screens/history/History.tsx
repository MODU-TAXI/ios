import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import HistoryInfoComponent from '@components/History/HistoryInfo';

import { useGetHistories } from '@hooks/api/history';

import { HistoryPreview } from '@type/entity/history';
import { HistoryScreenProps } from '@type/param/loginStack';

import AfterBar from '@assets/images/History/AfterBar.svg';
import DropDown from '@assets/images/History/DropDown.svg';
import BeforeBar from '@assets/images/History/BeforeBar.svg';

const HistoryScreen = ({ navigation }: HistoryScreenProps) => {
  const { data: histories } = useGetHistories();

  const toHistoryDetailScreen = (historyId: number) => {
    navigation.navigate('HistoryDetailScreen', { historyId: historyId });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-10 px-5">
        <View className="flex-row items-center">
          <Text className="mr-1 text-[20px] font-semibold tracking-tight text-[#9C9C9C]">
            2024년 5월
          </Text>

          <DropDown />
        </View>

        <View className="mt-6">
          <Text className="text-[16px] font-medium tracking-tight text-[#9C9C9C]">
            이번달 아낀 택시비
          </Text>
          <Text className="text-[28px] font-semibold tracking-tight text-main">51,130원</Text>
        </View>

        <View className="mt-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="mr-4 text-[12px] font-medium tracking-tight text-[#7C7C7C]">
                모택이용전
              </Text>

              <BeforeBar />
            </View>

            <Text className="text-[12px] font-medium tracking-tight text-[#3E3E3E]">143,000</Text>
          </View>

          <View className="mt-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="mr-4 text-[12px] font-medium tracking-tight text-[#7C7C7C]">
                모택이용후
              </Text>

              <AfterBar />
            </View>

            <Text className="text-[12px] font-medium tracking-tight text-[#3E3E3E]">73,000</Text>
          </View>
        </View>
      </View>

      <View className="my-7 h-2 w-full bg-[#F8FAF9]" />

      <ScrollView className="px-4">
        <View className="mb-1 px-2">
          <Text className="font-medium tracking-tight text-[#9C9C9C]">이용내역</Text>
        </View>

        {histories.historySimpleListResponse.map((history: HistoryPreview) => (
          <HistoryInfoComponent history={history} toHistoryDetailScreen={toHistoryDetailScreen} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;

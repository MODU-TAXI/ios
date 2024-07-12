import React from 'react';
import dayjs from 'dayjs';
import { Text, View, Pressable } from 'react-native';

import { HistoryPreview } from '@type/entity/history';

import Arrow from '@assets/images/History/Arrow.svg';
import NextButton from '@assets/images/History/NextButton.svg';

interface HistoryInfoComponentProps {
  history: HistoryPreview;
  toHistoryDetailScreen: (historyId: number) => void;
}

const HistoryInfoComponent: React.FC<HistoryInfoComponentProps> = ({
  history,
  toHistoryDetailScreen,
}) => {
  return (
    <Pressable className="px-2 py-4" onPress={() => toHistoryDetailScreen(history.historyId)}>
      {/* 날짜, 금액 */}
      <View className="flex-row items-center justify-between">
        {/* 첫번째 */}
        <View className="shrink flex-col justify-center ">
          <Text className="shrink truncate font-medium tracking-tight text-[#5D5D5D]">
            {history.departureName}
          </Text>

          <View className="my-1 flex-row items-center">
            <Arrow className="mr-1" />
            <Text className="font-medium tracking-tight text-[#5D5D5D]  ">
              {history.arrivalName}
            </Text>
          </View>
        </View>

        {/* 두번째 */}
        <View className="ml-1 flex-row items-center">
          <Text>-{history.portionCharge.toLocaleString('ko-KR')}원</Text>

          <NextButton />
        </View>
      </View>

      <View className="mt-[2.5px]">
        <Text className="text-[12px] tracking-tight text-[#AFAFAF]">
          {dayjs(history.departureTime).format('YYYY.MM.DD HH:MM')}
        </Text>
      </View>
    </Pressable>
  );
};

export default HistoryInfoComponent;

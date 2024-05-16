import React from 'react';
import dayjs from 'dayjs';
import { Text, View, StyleSheet } from 'react-native';

import { RoomDetail } from '@type/entity/room';

import Dot from '@assets/images/Chat/Dot.svg';
import Arrow from '@assets/images/Chat/Arrow.svg';
import Money from '@assets/images/Chat/Money.svg';
import People from '@assets/images/Chat/People.svg';

interface RoomInfoComponentProps {
  roomDetail: RoomDetail;
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(150, 150, 150, 0.25)',
    shadowOffset: { width: 0, height: 4 },
  },
});

const RoomInfoComponent: React.FC<RoomInfoComponentProps> = ({ roomDetail }) => {
  return (
    <View className="bg-gray-100">
      <View style={styles.shadow} className="flex-col rounded-b-3xl bg-white px-4 py-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-center">
            <View>
              <Text className="text-[16px] font-semibold text-[#272727]">
                {roomDetail.arrivalName}
              </Text>
            </View>

            <Arrow className="mx-2" />

            <View>
              <Text className="text-[16px] font-semibold text-[#272727]">
                {roomDetail.departureName}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-center rounded-lg bg-gray-200 px-3 py-[6px]">
            <Dot className="mr-1" />
            <Text className="text-[12px] text-gray-500">출발전</Text>
          </View>
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          {/*  출발 날짜, 출발 시각 */}
          <View className="flex-row">
            <View className="mr-2">
              <Text className="text-[12px] text-[#7c7c7c]">{dayjs().format('M월 DD일')}</Text>
            </View>

            <View>
              <Text className="text-[12px] text-[#7c7c7c]">{roomDetail.arrivalTime} 출발</Text>
            </View>
          </View>

          {/* 인원수, 가격 */}
          <View className="flex-row">
            <View className="mr-2 flex-row items-center justify-center">
              <People className="mr-1" />
              <Text className="text-[12px] text-[#7c7c7c]">{roomDetail.wishHeadcount} / 3</Text>
            </View>

            <View className="flex-row items-center justify-center">
              <Money className="mr-1" />
              <Text className="text-[12px] text-[#7c7c7c]">
                인당 {roomDetail.expectedChargePerPerson.toLocaleString('ko-KR')}원
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoomInfoComponent;

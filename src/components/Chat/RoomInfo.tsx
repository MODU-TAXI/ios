import React from 'react';
import dayjs from 'dayjs';
import { Text, View, StyleSheet } from 'react-native';

import { RoomPreview } from '@type/entity/room';

import Arrow from '@assets/images/Chat/Arrow.svg';
import Money from '@assets/images/Chat/Money.svg';
import People from '@assets/images/Chat/People.svg';
import DeleteStatus from '@assets/images/Chat/DeleteStatus.svg';
import CompleteStatus from '@assets/images/Chat/CompleteStatus.svg';
import ProceedingStatus from '@assets/images/Chat/ProceedingStatus.svg';
interface RoomInfoComponentProps {
  roomPreview: RoomPreview;
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(150, 150, 150, 0.25)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});

const RoomInfoComponent: React.FC<RoomInfoComponentProps> = ({ roomPreview }) => {
  return (
    <View className="z-10 bg-white">
      <View style={styles.shadow} className="flex-col rounded-b-3xl bg-white px-4 py-6">
        <View className="flex-row items-center justify-between ">
          <View className="w-[260px] flex-row items-center truncate">
            <Text className="text-[16px] font-semibold text-[#272727]">
              {roomPreview.departureName}
            </Text>

            <Arrow className="mx-2" />

            <Text className="text-[16px] font-semibold text-[#272727]">
              {roomPreview.arrivalName}
            </Text>
          </View>

          {roomPreview.roomStatus === 'PROCEEDING' && <ProceedingStatus />}
          {roomPreview.roomStatus === 'COMPLETE' && <CompleteStatus />}
          {roomPreview.roomStatus === 'DELETE' && <DeleteStatus />}
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          {/*  출발 날짜, 출발 시각 */}
          <View className="flex-row">
            <View className="mr-2">
              <Text className="text-[12px] text-[#7c7c7c]">{dayjs().format('M월 DD일')}</Text>
            </View>

            <View>
              <Text className="text-[12px] text-[#7c7c7c]">{roomPreview.departureTime} 출발</Text>
            </View>
          </View>

          {/* 인원수, 가격 */}
          <View className="flex-row">
            <View className="mr-2 flex-row items-center justify-center">
              <People className="mr-1" />
              <Text className="text-[12px] text-[#7c7c7c]">
                {roomPreview.currentHeadcount} / {roomPreview.wishHeadcount}
              </Text>
            </View>

            <View className="flex-row items-center justify-center">
              <Money className="mr-1" />
              <Text className="text-[12px] text-[#7c7c7c]">
                인당 {roomPreview.expectedChargePerPerson.toLocaleString('ko-KR')}원
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoomInfoComponent;

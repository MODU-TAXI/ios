import React from 'react';
import dayjs from 'dayjs';
import { Text, View, Pressable } from 'react-native';

import { Alarm } from '@type/entity/alarm';

import Match from '@assets/images/Alarm/Match.svg';
import Payment from '@assets/images/Alarm/Payment.svg';
import Calculate from '@assets/images/Alarm/Calculate.svg';
import NewMember from '@assets/images/Alarm/NewMember.svg';
import Declaration from '@assets/images/Alarm/Declaration.svg';
import CalculateRequest from '@assets/images/Alarm/CalculateRequest.svg';

interface AlaramComponentProps {
  alarm: Alarm;
  toMatchingRoom: (roomId: number, roomType: string) => void;
}

const alarmComponents = {
  PAYMENT_REQUEST: Payment,
  PAYMENT_REQUEST_COMPLETE: CalculateRequest,
  PAYMENT_ALL_COMPLETE: Calculate,
  PARTICIPATE_REQUEST: NewMember,
  MATCHING_SUCCESS: Match,
  MATCHING_COMPLETE: Match,
  REPORT_SUCCESS: Declaration,
};

const getRelativeTime = (dateTime: Date) => {
  const now = dayjs();
  const alarmTime = dayjs(dateTime);
  const diffInMinutes = now.diff(alarmTime, 'minute');
  const diffInHours = now.diff(alarmTime, 'hour');
  const diffInDays = now.diff(alarmTime, 'day');

  if (diffInDays >= 7) {
    return alarmTime.format('YYYY.MM.DD');
  } else if (diffInDays >= 1) {
    return `${diffInDays}일 전`;
  } else if (diffInHours >= 1) {
    return `${diffInHours}시간 전`;
  } else {
    return `${diffInMinutes}분 전`;
  }
};

const AlaramComponent: React.FC<AlaramComponentProps> = ({ alarm, toMatchingRoom }) => {
  const AlarmIcon = alarmComponents[alarm.type];

  if (!AlarmIcon) return <View></View>;

  return (
    <View
      className={
        !alarm.checked
          ? 'flex-row items-center border-b-[1px] border-b-gray-100 bg-[#F5F8FF] px-7 py-6'
          : 'flex-row items-center border-b-[1px] border-b-gray-100 px-7 py-6'
      }
    >
      <AlarmIcon className="mr-3" />

      <Pressable
        className="flex-col justify-center"
        onPress={() => toMatchingRoom(alarm.resourceId, alarm.type)}
      >
        <Text className="mb-[2px] font-medium tracking-tight text-[#3E3E3E]">{alarm.message}</Text>
        <Text className="text-[10px] tracking-tight text-[#9C9C9C]">
          {getRelativeTime(alarm.dateTime)}
        </Text>
      </Pressable>
    </View>
  );
};

export default AlaramComponent;

import React from 'react';
import dayjs from 'dayjs';
import { Text, View } from 'react-native';

import { Alarm } from '@type/entity/alarm';

import Match from '@assets/images/Alarm/Match.svg';
import Calculate from '@assets/images/Alarm/Calculate.svg';
import Declaration from '@assets/images/Alarm/Declaration.svg';

interface AlaramComponentProps {
  alarm: Alarm;
}

const alarmComponents = {
  PAYMENT_REQUEST: Calculate,
  PAYMENT_REQUEST_COMPLETE: Calculate,
  PAYMENT_ALL_COMPLETE: Calculate,
  PARTICIPATE_REQUEST: Match,
  MATCHING_SUCCESS: Match,
  MATCHING_COMPLETE: Match,
  REPORT_SUCCESS: Declaration,
};

const AlaramComponent: React.FC<AlaramComponentProps> = ({ alarm }) => {
  const AlarmIcon = alarmComponents[alarm.type];

  if (!AlarmIcon) return <View></View>;

  return (
    <View className="mb-10 flex-row items-center px-3">
      <AlarmIcon className="mr-3" />

      <View className="flex-col justify-center">
        <Text className="mb-[2px] font-medium tracking-tight text-[#3E3E3E]">{alarm.message}</Text>
        <Text className="text-[10px] tracking-tight text-[#9C9C9C]">
          {dayjs(alarm.dateTime).format('YYYY.MM.DD')}
        </Text>
      </View>
    </View>
  );
};

export default AlaramComponent;

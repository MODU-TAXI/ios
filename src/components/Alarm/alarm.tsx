import React from 'react';
import dayjs from 'dayjs';
import { Text, View } from 'react-native';

import { Alarm } from '@type/entity/alarm';

import Event from '@assets/images/Alarm/Event.svg';
import Calculate from '@assets/images/Alarm/Calculate.svg';
import Match_Complete from '@assets/images/Alarm/Match_Complete.svg';
import Calculate_Complete from '@assets/images/Alarm/Caculate_Complete.svg';
import Declaration_Complete from '@assets/images/Alarm/Declaration_Complete.svg';

interface AlaramComponentProps {
  alarm: Alarm;
}

const AlaramComponent: React.FC<AlaramComponentProps> = ({ alarm }) => {
  if (alarm.alarmType === 'calculate_complete') {
    return (
      <View className="mb-10 flex-row items-center px-3">
        <Calculate_Complete className="mr-3" />

        <View className="flex-col justify-center ">
          <Text className="mb-[2px] font-medium tracking-tight text-[#3E3E3E]">
            {alarm.content}
          </Text>
          <Text className="text-[10px] tracking-tight text-[#9C9C9C]">
            {dayjs(alarm.date).format('YYYY.MM.DD')}
          </Text>
        </View>
      </View>
    );
  } else if (alarm.alarmType === 'declaration_complete') {
    return (
      <View className="mb-10 flex-row items-center px-3 ">
        <Declaration_Complete className="mr-3" />

        <View className="flex-col justify-center ">
          <Text className="mb-[2px] font-medium tracking-tight text-[#3E3E3E]">
            {alarm.content}
          </Text>
          <Text className="text-[10px] tracking-tight text-[#9C9C9C]">
            {dayjs(alarm.date).format('YYYY.MM.DD')}
          </Text>
        </View>
      </View>
    );
  } else if (alarm.alarmType === 'calculate') {
    return (
      <View className="mb-10 flex-row items-center px-3 ">
        <Calculate className="mr-3" />

        <View className="flex-col justify-center ">
          <Text className="mb-[2px] font-medium tracking-tight text-[#3E3E3E]">
            {alarm.content}
          </Text>
          <Text className="text-[10px] tracking-tight text-[#9C9C9C]">
            {dayjs(alarm.date).format('YYYY.MM.DD')}
          </Text>
        </View>
      </View>
    );
  } else if (alarm.alarmType === 'event') {
    return (
      <View className="mb-10 flex-row items-center px-3 ">
        <Event className="mr-3" />

        <View className="flex-col justify-center ">
          <Text className="mb-[2px] font-medium tracking-tight text-[#3E3E3E]">
            {alarm.content}
          </Text>
          <Text className="text-[10px] tracking-tight text-[#9C9C9C]">
            {dayjs(alarm.date).format('YYYY.MM.DD')}
          </Text>
        </View>
      </View>
    );
  } else if (alarm.alarmType === 'match_complete') {
    return (
      <View className="mb-10 flex-row items-center px-3 ">
        <Match_Complete className="mr-3" />

        <View className="flex-col justify-center ">
          <Text className="mb-[2px] font-medium tracking-tight text-[#3E3E3E]">
            {alarm.content}
          </Text>
          <Text className="text-[10px] tracking-tight text-[#9C9C9C]">
            {dayjs(alarm.date).format('YYYY.MM.DD')}
          </Text>
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

export default AlaramComponent;

import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import AlaramsComponent from '@components/Alarm/alarms';

const alarms = [
  {
    alarmType: 'calculate_complete',
    content: '정산이 완료되었어요!',
    date: new Date(),
  },
  {
    alarmType: 'declaration_complete',
    content: '신고가 접수되었어요, 빨리 해결해 드릴게요!',
    date: new Date(),
  },
  {
    alarmType: 'declaration_complete',
    content: '신고가 접수되었어요, 빨리 해결해 드릴게요!',
    date: new Date(),
  },
  {
    alarmType: 'calculate',
    content: '정산해주세요!',
    date: new Date(),
  },
  {
    alarmType: 'event',
    content: '새로운 이벤트가 나왔어요!',
    date: new Date(),
  },
  {
    alarmType: 'match_complete',
    content: '매칭에 성공했어요!',
    date: new Date(),
  },
  {
    alarmType: 'declaration_complete',
    content: '매칭에 성공했어요!',
    date: new Date(),
  },
  {
    alarmType: 'calculate',
    content: '정산해주세요!',
    date: new Date(),
  },
  {
    alarmType: 'event',
    content: '새로운 이벤트가 나왔어요!',
    date: new Date(),
  },
  {
    alarmType: 'match_complete',
    content: '매칭에 성공했어요!',
    date: new Date(),
  },
  {
    alarmType: 'declaration_complete',
    content: '매칭에 성공했어요!',
    date: new Date(),
  },
];

const AlarmScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title={'알림'} />

      <AlaramsComponent alarms={alarms} />
    </SafeAreaView>
  );
};

export default AlarmScreen;

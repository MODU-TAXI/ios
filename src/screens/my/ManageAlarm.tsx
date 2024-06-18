import React, { useState } from 'react';
import { Text, View, Switch, SafeAreaView } from 'react-native';

import HeaderComponent from '@components/Header';

import { ManageAlarmScreenProps } from '@type/param/loginStack';

const ManageAlarmScreen = ({ navigation }: ManageAlarmScreenProps) => {
  const [marketingAlarmEnable, setMarketingAlarmEnable] = useState(false);
  const [eventAlarmEnable, setEventAlarmEnable] = useState(false);
  const [modutaxiAlarmEnable, setModutaxiAlarmEnable] = useState(false);

  const toggleMarketingAlarmSwitch = () =>
    setMarketingAlarmEnable((previousState) => !previousState);
  const togglEventAlarmSwitch = () => setEventAlarmEnable((previousState) => !previousState);
  const toggleModutaxiAlarmSwitch = () => setModutaxiAlarmEnable((previousState) => !previousState);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="알림설정" />
      <View className="mt-6 px-4">
        <View className="rounded-xl border-[1px] border-[#EBEBEB] p-4">
          <View className="flex-row items-center justify-between pb-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">마케팅 정보 수신</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleMarketingAlarmSwitch}
              value={marketingAlarmEnable}
            />
          </View>

          <View className="border-b-[1px] border-[#D9D9D9]" />

          <View className="flex-row items-center justify-between py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">
              공지사항 / 이벤트 정보 수신
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={togglEventAlarmSwitch}
              value={eventAlarmEnable}
            />
          </View>

          <View className="border-b-[1px] border-[#D9D9D9]" />

          <View className="flex-row items-center justify-between pt-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">
              모두의 택시 이용 알림 수신
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleModutaxiAlarmSwitch}
              value={modutaxiAlarmEnable}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageAlarmScreen;

import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EtcComponent from '@components/Home/Etc';
import TopComponent from '@components/Home/Top';
import MiddleComponent from '@components/Home/Middle';
import PartiesComponent from '@components/Home/Parties';
import InputBoxComponent from '@components/Home/InputBox';

import { HomeScreenProps } from '@type/param/loginStack';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const toCreateRoomScreen = () => {
    navigation.navigate('CreateRoomScreen');
  };

  const toMapScreen = () => {
    navigation.navigate('MainMapScreen');
  };

  const toSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-col px-4">
        {/* 로고, 알림 */}
        <TopComponent />

        {/* 이름 */}
        <View className="mt-2 flex-row items-center">
          <Text className="text-[20px]">반가워요,</Text>
          <Text className="text-[20px] font-semibold">정현님!</Text>
        </View>

        {/* 검색 */}
        <InputBoxComponent toSearchScreen={toSearchScreen} />

        {/* 지도, 택시팟 */}
        <MiddleComponent toMapScreen={toMapScreen} toCreateRoomScreen={toCreateRoomScreen} />

        {/* 실시간 택시팟 */}
        <PartiesComponent />

        {/* 기타 */}
        <EtcComponent />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

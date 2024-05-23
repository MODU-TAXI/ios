import React from 'react';
import { useRecoilValue } from 'recoil';
import { Text, View, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import EtcComponent from '@components/Home/Etc';
import TopComponent from '@components/Home/Top';
import MiddleComponent from '@components/Home/Middle';
import PartiesComponent from '@components/Home/Parties';
import InputBoxComponent from '@components/Home/InputBox';

import { userInfoState } from '@recoil/recoil';

import { HomeScreenProps } from '@type/param/loginStack';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const userInfo = useRecoilValue(userInfoState);

  const toCreateRoomScreen = () => {
    navigation.navigate('CreateRoomScreen');
  };

  const toMapScreen = async () => {
    navigation.navigate('MainMapScreen');
  };

  const toSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <ScrollView className="flex-col px-4">
        {/* 로고, 알림 */}
        <TopComponent />

        {/* 이름 */}
        <View className="mt-2 flex-row items-center">
          <Text className="text-[20px]">반가워요,</Text>
          <Text className="text-[20px] font-semibold">{userInfo.name}님!</Text>
        </View>

        {/* 검색 */}
        <InputBoxComponent toSearchScreen={toSearchScreen} />

        {/* 지도, 택시팟 */}
        <MiddleComponent toMapScreen={toMapScreen} toCreateRoomScreen={toCreateRoomScreen} />

        {/* 실시간 택시팟 */}
        <PartiesComponent />

        {/* 기타 */}
        <EtcComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

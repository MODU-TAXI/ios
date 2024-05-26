import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import EtcComponent from '@components/Home/Etc';
import TopComponent from '@components/Home/Top';
import MiddleComponent from '@components/Home/Middle';
import PartiesComponent from '@components/Home/Parties';
import MyPartyComponent from '@components/Home/MyParty';
import NoPartyComponent from '@components/Home/NoParty';

import { roomState, userInfoState } from '@recoil/recoil';

import { useGetRoomPreview } from '@hooks/api/rooms';

import { HomeScreenProps } from '@type/param/loginStack';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const userInfo = useRecoilValue(userInfoState);

  const roomId = useRecoilValue(roomState);

  const { roomPreview } = useGetRoomPreview(roomId);

  const toCreateRoomScreen = () => {
    navigation.navigate('CreateRoomScreen');
  };

  const toMapScreen = async () => {
    navigation.navigate('MainMapScreen');
  };

  const toSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };

  const toChatRoomScreen = () => {
    navigation.navigate('ChatRoomScreen', { roomId: roomId });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      {/* 로고, 알림 */}
      <TopComponent userInfo={userInfo} toSearchScreen={toSearchScreen} roomId={roomId} />

      <ScrollView>
        {/* 지도, 택시팟 */}
        <MiddleComponent toMapScreen={toMapScreen} toCreateRoomScreen={toCreateRoomScreen} />

        <View className="my-6 h-2 bg-[#F2F2F2]" />

        {/* 내가 참여중인 방 */}
        {roomPreview ? (
          <MyPartyComponent roomPreview={roomPreview} toChatRoomScreen={toChatRoomScreen} />
        ) : (
          <NoPartyComponent />
        )}

        <View className="my-6 h-2 bg-[#F2F2F2]" />

        {/* 실시간 택시팟 */}
        <PartiesComponent />

        <View className="my-6 h-2 bg-[#F2F2F2]" />

        {/* 기타 */}
        <EtcComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

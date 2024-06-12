import React, { Suspense } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Vibration, RefreshControl } from 'react-native';

import EtcComponent from '@components/Home/Etc';
import TopComponent from '@components/Home/Top';
import MiddleComponent from '@components/Home/Middle';
import PartiesComponent from '@components/Home/Parties';
import MyPartyComponent from '@components/Home/MyParty';
import NoPartyComponent from '@components/Home/NoParty';
import LoadingComponent from '@components/Common/Loading';

import { roomState, userInfoState } from '@recoil/recoil';

import { getMyChatInfo } from '@server/api/chat';

import { useGetRoomPreview } from '@hooks/api/rooms';

import { HomeScreenProps } from '@type/param/loginStack';

const HomeComponent = ({ navigation }: HomeScreenProps) => {
  const userInfo = useRecoilValue(userInfoState);

  const [socketRoomId, setSocketRoomId] = useRecoilState(roomState);

  const checkMyRoom = async () => {
    const response = await getMyChatInfo();
    const { roomId } = response;

    setSocketRoomId(roomId);
  };

  useFocusEffect(
    React.useCallback(() => {
      checkMyRoom();
    }, []),
  );

  const { data: roomPreview, refetch: refetchRoomPreview } = useGetRoomPreview(socketRoomId);

  // 새로고침시 필요한 변수
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    Vibration.vibrate(0.1); // 새로고침시 진동

    const response = await getMyChatInfo();
    const { roomId } = response;

    setSocketRoomId(roomId);

    if (roomId > 0) {
      await refetchRoomPreview();
    }

    setRefreshing(false);
  }, [refetchRoomPreview]);

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
    navigation.navigate('RoomDetailScreen', { roomId: socketRoomId });
  };

  const toAlarmScreen = () => {
    navigation.navigate('AlarmScreen');
  };

  if (!userInfo || !socketRoomId) return <LoadingComponent />;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      {/* 로고, 알림 */}
      <TopComponent
        userInfo={userInfo}
        toSearchScreen={toSearchScreen}
        toAlarmScreen={toAlarmScreen}
        roomId={socketRoomId}
      />

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
        <PartiesComponent navigation={navigation} />

        <View className="my-6 h-2 bg-[#F2F2F2]" />

        {/* 기타 */}
        <EtcComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <HomeComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

export default HomeScreen;

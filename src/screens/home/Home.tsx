import React, { Suspense } from 'react';
import { View, RefreshControl } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PartiesComponent from '@components/Home/Parties';
import MyPartyComponent from '@components/Home/MyParty';
import NoPartyComponent from '@components/Home/NoParty';
import LoadingComponent from '@components/Common/Loading';
import HomeHeaderComponent from '@components/Home/HomeHeader';
import UserSummaryComponent from '@components/Home/UserSummary';
import HomeMainPanelComponent from '@components/Home/HomeMainPanel';

import { roomState, userInfoState } from '@recoil/recoil';

import { getMyChatInfo } from '@server/api/chat';

import { useGetAlarmsCount } from '@hooks/api/alarms';
import { useGetRoomList, useGetRoomPreview } from '@hooks/api/rooms';

import { vibration } from '@utils/effect';

import { HomeScreenProps } from '@type/param/loginStack';

const HomeComponent = ({ navigation }: HomeScreenProps) => {
  const userInfo = useRecoilValue(userInfoState);

  const [socketRoomId, setSocketRoomId] = useRecoilState(roomState);

  const [refreshing, setRefreshing] = React.useState(false);

  const checkMyRoom = async () => {
    const response = await getMyChatInfo();
    const { roomId } = response;

    setSocketRoomId(roomId);
  };

  const { data: alarmsCount, refetch: alarmsCountRefetch } = useGetAlarmsCount();

  const { data: roomPreview, refetch: refetchRoomPreview } = useGetRoomPreview(socketRoomId);

  const { rooms: recentRooms, refetch: refetchRoomList } = useGetRoomList({
    "page": 0,
    "size": 10,
    "sortType": "NEW",
    "searchLatitude": 37.46504,
    "searchLongitude": 126.68045,
    "radius": 500000,
  })

  useFocusEffect(
    React.useCallback(() => {
      checkMyRoom();
      alarmsCountRefetch();
    }, []),
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    vibration();

    refetchRoomList();

    const response = await getMyChatInfo();

    const { roomId } = response;

    setSocketRoomId(roomId);

    if (roomId > 0) {
      await refetchRoomPreview();
    }

    setRefreshing(false);
  }, [refetchRoomPreview, refetchRoomList]);

  const toCreateRoomScreen = () => {
    navigation.navigate('CreateRoomScreen');
  };

  const toMapScreen = async () => {
    navigation.navigate('MainMapScreen');
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
      <HomeHeaderComponent
        userInfo={userInfo}
        toMapScreen={toMapScreen}
        toAlarmScreen={toAlarmScreen}
        alarmsCount={alarmsCount?.counts}
        roomId={socketRoomId}
        navigation={navigation}
      />

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* 지도, 택시팟 */}
        <HomeMainPanelComponent toMapScreen={toMapScreen} toCreateRoomScreen={toCreateRoomScreen} />

        <View className="my-6 h-2 bg-[#F2F2F2]" />

        {/* 내가 참여중인 방 */}
        {roomPreview ? (
          <MyPartyComponent roomPreview={roomPreview} toChatRoomScreen={toChatRoomScreen} />
        ) : (
          <NoPartyComponent />
        )}

        <View className="my-6 h-2 bg-[#F2F2F2]" />

        {/* 실시간 택시팟 */}
        <PartiesComponent navigation={navigation} rooms={recentRooms} />

        <View className="my-6 h-2 bg-[#F2F2F2]" />

        {/* 기타 */}
        <UserSummaryComponent navigation={navigation} />
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

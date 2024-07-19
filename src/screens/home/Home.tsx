import React, { useState, Suspense } from 'react';
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
import SuspenseErrorHandler from '@server/errorHandler/suspenseErrorHandler';

import { useDeleteAllNotifee } from '@hooks/notifee';
import { useGetAlarmsCount } from '@hooks/api/alarms';
import { useGetHistoriesByMonth } from '@hooks/api/history';
import { useGetRoomList, useGetRoomPreview } from '@hooks/api/rooms';

import { vibration } from '@utils/effect';

import { HomeScreenProps } from '@type/param/loginStack';

const HomeComponent = ({ navigation }: HomeScreenProps) => {
  const date = new Date();

  useDeleteAllNotifee();

  const userInfo = useRecoilValue(userInfoState);

  const [socketRoomId, setSocketRoomId] = useRecoilState(roomState);

  const [refreshing, setRefreshing] = useState(false);

  const { data: alarmsCountData, refetch: alarmsCountRefetch } = useGetAlarmsCount();

  const [alarmsCount, setAlarmsCount] = useState<number | undefined>(alarmsCountData?.counts);

  const { data: roomPreview, refetch: refetchRoomPreview } = useGetRoomPreview(socketRoomId);

  const { rooms: recentRooms, refetch: refetchRoomList } = useGetRoomList({
    page: 0,
    size: 10,
    sortType: 'NEW',
    searchLatitude: 37.46504,
    searchLongitude: 126.68045,
    radius: 500000,
  });

  const { data: histories, refetch: refetchHistories } = useGetHistoriesByMonth(
    date.getFullYear(),
    date.getMonth() + 1,
  );

  const checkMyRoom = async () => {
    const response = await getMyChatInfo();
    const { roomId } = response;

    setSocketRoomId(roomId);
  };

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
    refetchHistories();

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

  const toMapScreen = () => {
    navigation.navigate('MainMapScreen');
  };

  const toChatRoomScreen = () => {
    navigation.navigate('RoomDetailScreen', { roomId: socketRoomId });
  };

  const toAlarmScreen = () => {
    navigation.navigate('AlarmScreen');

    setAlarmsCount(0);
  };

  if (!userInfo || !socketRoomId || !histories) return <LoadingComponent />;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      {/* 로고, 알림 */}
      <HomeHeaderComponent
        userInfo={userInfo}
        toMapScreen={toMapScreen}
        toAlarmScreen={toAlarmScreen}
        alarmsCount={alarmsCount}
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
        <UserSummaryComponent
          navigation={navigation}
          histories={histories}
          month={date.getMonth()}
          userInfo={userInfo}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
  return (
    <SuspenseErrorHandler navigation={navigation}>
      <Suspense fallback={<LoadingComponent />}>
        <HomeComponent navigation={navigation} route={route} />
      </Suspense>
    </SuspenseErrorHandler>
  );
};

export default HomeScreen;

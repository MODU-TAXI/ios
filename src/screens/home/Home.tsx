import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import EtcComponent from '@components/Home/Etc';
import TopComponent from '@components/Home/Top';
import MiddleComponent from '@components/Home/Middle';
import PartiesComponent from '@components/Home/Parties';
import MyPartyComponent from '@components/Home/MyParty';
import NoPartyComponent from '@components/Home/NoParty';
import LoadingComponent from '@components/Common/Loading';

import { roomState, userInfoState } from '@recoil/recoil';

import { useGetRoomPreview } from '@hooks/api/rooms';

import { HomeScreenProps } from '@type/param/loginStack';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const userInfo = useRecoilValue(userInfoState);

  const roomId = useRecoilValue(roomState);

  // 여기서는 useQuery 사용하지 않으면 해결될듯 -> 이게 된다음 화면을 그려줘서 문제가 생기는 듯 하다
  // 이 부분은 youtube 글을 작성하도록 하자... useSuspensequery에 대해
  const { data: roomPreview, refetch: refetchRoomPreview } = useGetRoomPreview(roomId);

  // 새로고침시 필요한 변수
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetchRoomPreview();
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
    navigation.navigate('RoomDetailScreen', { roomId: roomId });
  };

  const toAlarmScreen = () => {
    navigation.navigate('AlarmScreen');
  };

  if (!userInfo || !roomId) return <LoadingComponent />;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      {/* 로고, 알림 */}
      <TopComponent
        userInfo={userInfo}
        toSearchScreen={toSearchScreen}
        toAlarmScreen={toAlarmScreen}
        roomId={roomId}
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
        <PartiesComponent />

        <View className="my-6 h-2 bg-[#F2F2F2]" />

        {/* 기타 */}
        <EtcComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeComponent = ({ route, navigation }: HomeScreenProps) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <HomeComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

export default HomeScreen;

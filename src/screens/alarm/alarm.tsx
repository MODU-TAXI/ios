import React, { Suspense } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import AlaramsComponent from '@components/Alarm/alarms';
import LoadingComponent from '@components/Common/Loading';

import SuspenseErrorHandler from '@server/errorHandler/suspenseErrorHandler';

import { useGetAlarms } from '@hooks/api/alarms';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { AlarmScreenProps } from '@type/param/loginStack';

const AlarmComponent = ({ navigation }: AlarmScreenProps) => {
  useDeleteAllNotifee();

  const { fetchNextPage, hasNextPage, ...result } = useGetAlarms();

  const toMatchingRoom = (roomId: number, roomType: string) => {
    if (roomType !== 'REPORT_SUCCESS') {
      navigation.navigate('RoomDetailScreen', { roomId: roomId });
    }
  };

  const loadMoreAlarms = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (!result.data) return <LoadingComponent />;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <HeaderComponent title={'알림'} />
      <AlaramsComponent
        alarms={result.data.pages.map((page) => page.result).flat()}
        loadMoreAlarms={loadMoreAlarms}
        toMatchingRoom={toMatchingRoom}
      />
    </SafeAreaView>
  );
};

const AlarmScreen = ({ route, navigation }: AlarmScreenProps) => {
  return (
    <SuspenseErrorHandler navigation={navigation}>
      <Suspense fallback={<LoadingComponent />}>
        <AlarmComponent navigation={navigation} route={route} />
      </Suspense>
    </SuspenseErrorHandler>
  );
};

export default AlarmScreen;

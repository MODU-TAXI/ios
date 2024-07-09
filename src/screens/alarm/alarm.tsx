import React, { useState, Suspense, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import AlaramsComponent from '@components/Alarm/alarms';
import LoadingComponent from '@components/Common/Loading';

import SuspenseErrorHandler from '@server/errorHandler/suspenseErrorHandler';

import { useGetAlarms } from '@hooks/api/alarms';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { Alarm } from '@type/entity/alarm';
import { AlarmScreenProps } from '@type/param/loginStack';

const AlarmComponent = ({ navigation }: AlarmScreenProps) => {
  useDeleteAllNotifee();

  const [page, setPage] = useState<number>(0);
  const [alarmsList, setAlarmsList] = useState<Alarm[]>([]);

  const { data: alarms, isFetching } = useGetAlarms(page);

  useEffect(() => {
    if (alarms) {
      setAlarmsList((prevAlarms) => [...prevAlarms, ...alarms.result]);
    }
  }, [alarms]);

  const loadMoreAlarms = () => {
    if (!isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (!alarms) return <LoadingComponent />;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <HeaderComponent title={'알림'} />
      <AlaramsComponent alarms={alarmsList} loadMoreAlarms={loadMoreAlarms} />
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

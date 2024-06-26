import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import AlaramsComponent from '@components/Alarm/alarms';
import LoadingComponent from '@components/Common/Loading';

import { useGetAlarms } from '@hooks/api/alarms';

import { Alarm } from '@type/entity/alarm';

const AlarmScreen = () => {
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

export default AlarmScreen;

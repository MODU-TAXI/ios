import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import notifee, { EventType } from '@notifee/react-native';

import { deleteAllNotifee, handleNotificationPress } from '@utils/notifee';

// notifee 관리
export const useNotifee = () => {
  useEffect(() => {
    // foreground일때 notifee 알림제어
    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        await handleNotificationPress(detail);
      } else if (type === EventType.DISMISSED) {
        await handleNotificationPress(detail);
      }
    });

    // background, quit일떄 알림제어 -> ios는 quit상태거 없어서 필요없지만 더 공부해봄
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        await handleNotificationPress(detail);
      } else if (type === EventType.DISMISSED) {
        await handleNotificationPress(detail);
      }
    });
  }, []);
};

export const useDeleteAllNotifee = () => {
  useFocusEffect(
    React.useCallback(() => {
      deleteAllNotifee();
    }, []),
  );
};

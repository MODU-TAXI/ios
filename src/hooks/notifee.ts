import { AppState } from 'react-native';
import React, { useState, useEffect } from 'react';
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
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        deleteAllNotifee();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      deleteAllNotifee();
    }, []),
  );
};

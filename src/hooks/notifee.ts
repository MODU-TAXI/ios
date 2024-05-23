import { useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';

import { handleNotificationPress } from '@utils/notifee';

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

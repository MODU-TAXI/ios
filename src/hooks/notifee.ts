import { useEffect } from 'react';
import { Linking } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';

export const useNotifee = () => {
  useEffect(() => {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      console.log(detail);
      if (type === EventType.PRESS) {
        // 처리할 이벤트 추가
        console.log('touch!');
        await Linking.openURL('modutaxi://createRoom');
      } else if (type === EventType.DISMISSED) {
        console.log('dismiss');
        // noti 삭제
        if (detail?.notification?.id) {
          notifee.cancelNotification(detail.notification.id);
          notifee.cancelDisplayedNotification(detail.notification.id);
        }
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      console.log('App.js notifee onBackgroundEvent==============');
      if (type === EventType.PRESS) {
        // 처리할 이벤트 추가
      } else if (type === EventType.DISMISSED) {
        // noti 삭제
        // notifee.cancelNotification(detail.notification.id);
        // notifee.cancelDisplayedNotification(detail.notification.id);
      }
    });
  });
};

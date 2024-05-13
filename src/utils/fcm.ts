import notifee from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export const onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  // 디바이스에 알림을 표시합니다.
  await notifee.displayNotification({
    title: message.notification!.title,
    body: message.notification!.body,
  });
};

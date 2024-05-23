import { Linking } from 'react-native';
import notifee, { EventDetail } from '@notifee/react-native';

// notifee로 알림 보여주는 handling
export const handleFirebaseMessage = async (
  title: string,
  content: string,
  messageType: string,
  roomId?: string,
): Promise<string> => {
  if (roomId) {
    return notifee.displayNotification({
      title: title,
      body: content,
      data: { messageType: messageType, roomId: roomId },
    });
  }

  return notifee.displayNotification({
    title: '모두의 택시',
    body: content,
    data: { messageType: messageType },
  });
};

// notifee 알림을 클릭했을때 handling
export const handleNotificationPress = async (detail: EventDetail) => {
  const messageType = detail.notification?.data?.messageType;
  const roomId = detail.notification?.data?.roomId;

  switch (messageType) {
    case 'CHAT':
    case 'JOIN':
    case 'LEAVE':
    case 'ROOM_UPDATE':
    case 'PARTICIPATE_REQUEST':
    case 'MATCHING_COMPLETE':
    case 'MATCHING_SUCCESS':
    case 'DEPART_10_MINUTES_AGO':
    case 'REMIT_REQUEST':
      if (roomId) {
        await Linking.openURL(`modutaxi://room/${roomId}`);
      }
      break;
    case 'ROOM_DELETE':
      await Linking.openURL('modutaxi://main');
      break;
    default:
      await Linking.openURL('modutaxi://main');
      break;
  }
};

// notifee 알림을 무시했을때 handling
export const handleNotificationDismissed = async (detail: EventDetail) => {
  if (detail?.notification?.id) {
    await notifee.cancelNotification(detail.notification.id);
    await notifee.cancelDisplayedNotification(detail.notification.id);
  }
};

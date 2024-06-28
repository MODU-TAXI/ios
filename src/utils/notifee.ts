import { Linking, Vibration } from 'react-native';
import notifee, { EventDetail } from '@notifee/react-native';

// notifee로 알림 보여주는 handling
export const handleFirebaseMessage = async (
  title: string,
  content: string,
  messageType: string,
  roomId?: string,
): Promise<string> => {
  if (roomId) {
    Vibration.vibrate(1);
    return notifee.displayNotification({
      title: '모두의 택시',
      body: content,
      data: { messageType: messageType, roomId: roomId },
    });
  }

  Vibration.vibrate(1);
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
    // 채팅방으로 이동
    case 'CHAT':
    case 'IMAGE':
    case 'CHAT_BOT':
    case 'CALL_TAXI':
    case 'MATCHING_COMPLETE':
    case 'PAYMENT_REQUEST':
    case 'PAYMENT_REQUEST_COMPLETE':
    case 'PAYMENT_COMPLETE':
    case 'PAYMENT_ALL_COMPLETE':
      if (roomId) {
        await Linking.openURL(`modutaxi://chatRoom/${roomId}`);
      }
      break;

    // 매칭방으로 이동
    case 'JOIN':
    case 'LEAVE':
    case 'ROOM_UPDATE':
    case 'PARTICIPATE_REQUEST':
    case 'MATCHING_SUCCESS':
      if (roomId) {
        await Linking.openURL(`modutaxi://room/${roomId}`);
      }
      break;

    // 홈으로 이동
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

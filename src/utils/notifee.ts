import { Linking, Vibration } from 'react-native';
import notifee, { EventDetail } from '@notifee/react-native';

// notifee 모두 삭제
export const deleteAllNotifee = async () => {
  await notifee.cancelAllNotifications();
};

// notifee로 알림 보여주는 handling
export const handleFirebaseMessage = async (
  title: string,
  content: string,
  messageType: string,
  roomId?: string,
): Promise<string> => {
  Vibration.vibrate(1);

  if (roomId) {
    if (messageType === 'CHAT' || messageType === 'IMAGE') {
      return notifee.displayNotification({
        title: title,
        body: content,
        data: { messageType: messageType, roomId: roomId },
      });
    }

    return notifee.displayNotification({
      title: title,
      body: content,
      data: { messageType: messageType, roomId: roomId },
    });
  }

  return notifee.displayNotification({
    title: title,
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

  await deleteAllNotifee();
};

// notifee 알림을 무시했을때 handling
export const handleNotificationDismissed = async (detail: EventDetail) => {
  if (detail?.notification?.id) {
    await deleteAllNotifee();
  }
};

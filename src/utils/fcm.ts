import notifee from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

interface CustomFirebaseMessagingTypes extends FirebaseMessagingTypes.RemoteMessage {
  data: {
    MessageType: string;
    content: string;
    rooId: string;
    [key: string]: string; // 추가적인 필드를 위한 인덱스 시그니처
  };
}

export const handleFirebaseMessage = async (title: string, content: string): Promise<void> => {
  await notifee.displayNotification({
    title: JSON.stringify(title),
    body: JSON.stringify(content),
  });
};

// Foreground에서 FCM Message 수신
export const onMessageReceivedForeground = async (
  message: CustomFirebaseMessagingTypes,
  chatIn: boolean,
): Promise<void> => {
  if (message.data.MessageType === 'CHAT') {
    if (chatIn) {
      return handleFirebaseMessage('모두의 택시', message.data.content);
    }
  } else if (message.data.MessageType === 'JOIN') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'LEAVE') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'ROOM_UPDATE') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'PARTICIPATE_REQUEST') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'MATCHING_COMPLETE') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'REMIT_REQUEST') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'ROOM_DELETE') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'MATCHING_SUCCESS') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'TIME_TO_DEPART') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'DEPART_10_MINUTES_AGO') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  }
};

// Background에서 FCM Message 수신
export const onMessageReceivedBackground = async (
  message: CustomFirebaseMessagingTypes,
): Promise<void> => {
  if (message.data.MessageType === 'CHAT') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'JOIN') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'LEAVE') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'ROOM_UPDATE') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'PARTICIPATE_REQUEST') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'MATCHING_COMPLETE') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'REMIT_REQUEST') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'ROOM_DELETE') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'MATCHING_SUCCESS') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'TIME_TO_DEPART') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else if (message.data.MessageType === 'DEPART_10_MINUTES_AGO') {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  } else {
    return handleFirebaseMessage('모두의 택시', message.data.content);
  }
};

import notifee from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export const handleFirebaseMessage = async (title: string, content: string): Promise<void> => {
  await notifee.displayNotification({
    title: title,
    body: content,
  });
};

// Foreground에서 FCM Message 수신
export const onMessageReceivedForeground = async (
  message: FirebaseMessagingTypes.RemoteMessage,
  chatIn: boolean,
): Promise<void> => {
  console.log(message);
  await notifee.displayNotification({
    title: '모두의 택시',
    body: message.notification.body,
    data: { roomId: message.data.roomId, messageType: message.data.messageType },
  });
  // if (message.data && typeof message.data.message === 'string') {
  //   if (message.data?.MessageType === 'CHAT') {
  //     if (!chatIn) {
  //       return handleFirebaseMessage('모두의 택시', message.data.message);
  //     }
  //   } else if (message.data.MessageType === 'JOIN') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else if (message.data.MessageType === 'LEAVE') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else if (message.data.MessageType === 'ROOM_UPDATE') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else if (message.data.MessageType === 'PARTICIPATE_REQUEST') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else if (message.data.MessageType === 'MATCHING_COMPLETE') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else if (message.data.MessageType === 'REMIT_REQUEST') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else if (message.data.MessageType === 'ROOM_DELETE') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else if (message.data.MessageType === 'MATCHING_SUCCESS') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else if (message.data.MessageType === 'TIME_TO_DEPART') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else if (message.data.MessageType === 'DEPART_10_MINUTES_AGO') {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   } else {
  //     return handleFirebaseMessage('모두의 택시', message.data.message);
  //   }
  // }
};

// Background에서 FCM Message 수신
export const onMessageReceivedBackground = async (
  message: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
  if (message.data && typeof message.data.message === 'string') {
    if (message.data?.MessageType === 'CHAT') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'JOIN') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'LEAVE') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'ROOM_UPDATE') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'PARTICIPATE_REQUEST') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'MATCHING_COMPLETE') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'REMIT_REQUEST') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'ROOM_DELETE') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'MATCHING_SUCCESS') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'TIME_TO_DEPART') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else if (message.data.MessageType === 'DEPART_10_MINUTES_AGO') {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    } else {
      return handleFirebaseMessage('모두의 택시', message.data.message);
    }
  }
};

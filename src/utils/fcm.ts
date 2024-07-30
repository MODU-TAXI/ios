import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { handleFirebaseMessage } from './notifee';
import { fcmToastMessage, fcmChatToastMessage, fcmChatBotToastMessage } from './toastMessage';

// Foreground에서 FCM Message 수신
export const onMessageReceivedForeground = async (
  message: FirebaseMessagingTypes.RemoteMessage,
  chatIn: boolean,
): Promise<void> => {
  const title = message?.notification?.title;
  const body = message?.notification?.body;
  const messageType = message?.data?.messageType;
  const roomId = message?.data?.roomId;

  // title, body, messageType이 없을때는 return;
  if (!title || !body || !messageType) {
    return;
  }

  if (typeof messageType !== 'string') {
    return;
  }

  const deeplink = `modutaxi://chatRoom/${roomId}`;

  // 채팅관련 FCM
  if (messageType === 'CHAT' || messageType === 'IMAGE') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      const fcm_options = message?.data?.fcm_options as any;

      const imageUrl = fcm_options.image as string;

      if (!imageUrl) return;

      fcmChatToastMessage(title, body, imageUrl, deeplink);
    }
  } else if (messageType === 'CHAT_BOT') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      fcmChatBotToastMessage(body, deeplink);
    }
  } else if (messageType === 'CALL_TAXI') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      fcmChatBotToastMessage(body, deeplink);
    }
  } else if (messageType === 'MATCHING_COMPLETE') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      fcmChatBotToastMessage(body, deeplink);
    }
  } else if (messageType === 'PAYMENT_REQUEST') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      fcmChatBotToastMessage(body, deeplink);
    }
  } else if (messageType === 'PAYMENT_REQUEST_COMPLETE') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      fcmChatBotToastMessage(body, deeplink);
    }
  } else if (messageType === 'PAYMENT_COMPLETE') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      fcmChatBotToastMessage(body, deeplink);
    }
  } else if (messageType === 'PAYMENT_ALL_COMPLETE') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      fcmChatBotToastMessage(body, deeplink);
    }
  }

  // 매칭관련 FCM
  else if (messageType === 'PARTICIPATE_REQUEST') {
    const roomDeeplink = `modutaxi://room/${roomId}`;

    if (roomId && typeof roomId === 'string') {
      fcmToastMessage(body, roomDeeplink);
    }
  } else if (messageType === 'MATCHING_SUCCESS') {
    const roomDeeplink = `modutaxi://room/${roomId}`;

    if (roomId && typeof roomId === 'string') {
      fcmToastMessage(body, roomDeeplink);
    }
  } else if (messageType === 'JOIN') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      fcmToastMessage(body, deeplink);
    }
  } else if (messageType === 'LEAVE') {
    if (chatIn) return;

    if (roomId && typeof roomId === 'string') {
      fcmToastMessage(body, deeplink);
    }
  }
};

// Background에서 FCM Message 수신
export const onMessageReceivedBackground = async (
  message: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
  const title = message?.notification?.title;
  const body = message?.notification?.body;
  const messageType = message?.data?.messageType;
  const roomId = message?.data?.roomId;

  // title, body, messageType이 없을때는 return;
  if (!title || !body || !messageType) {
    return;
  }

  if (typeof messageType !== 'string') {
    return;
  }

  if (!title || !body || !messageType) {
    return;
  }

  if (typeof messageType !== 'string') {
    return;
  }
  // 채팅관련 FCM
  if (messageType === 'CHAT' || messageType === 'IMAGE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'JOIN') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'LEAVE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'CHAT_BOT') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'CALL_TAXI') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'MATCHING_COMPLETE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'PAYMENT_REQUEST') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'PAYMENT_REQUEST_COMPLETE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'PAYMENT_COMPLETE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'PAYMENT_ALL_COMPLETE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  }

  // 매칭관련 FCM
  else if (messageType === 'PARTICIPATE_REQUEST') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'MATCHING_SUCCESS') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  }

  // 방 업데이트 관련 FCM
  else if (messageType === 'ROOM_UPDATE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'ROOM_DELETE') {
    await handleFirebaseMessage(title, body, messageType);
  }

  // 나머지 FCM
  else {
    await handleFirebaseMessage(title, body, messageType);
  }
};

import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { handleFirebaseMessage } from './notifee';

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

  if (messageType === 'CHAT' || messageType === 'IMAGE') {
    if (chatIn) return;

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
  } else if (messageType === 'ROOM_UPDATE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'PARTICIPATE_REQUEST') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'MATCHING_COMPLETE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'REMIT_REQUEST') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'ROOM_DELETE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'MATCHING_SUCCESS') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'TIME_TO_DEPART') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'DEPART_10_MINUTES_AGO') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else {
    await handleFirebaseMessage(title, body, messageType);
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

  if (messageType === 'CHAT' || messageType === 'IMAGE ') {
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
  } else if (messageType === 'ROOM_UPDATE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'PARTICIPATE_REQUEST') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'MATCHING_COMPLETE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'REMIT_REQUEST') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'ROOM_DELETE') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'MATCHING_SUCCESS') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'TIME_TO_DEPART') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else if (messageType === 'DEPART_10_MINUTES_AGO') {
    if (roomId && typeof roomId === 'string') {
      await handleFirebaseMessage(title, body, messageType, roomId);
    }
  } else {
    await handleFirebaseMessage(title, body, messageType);
  }
};

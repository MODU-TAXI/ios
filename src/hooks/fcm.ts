import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

import { IsChatInRecoil } from '@recoil/type';
import { isChatInRecoilState } from '@recoil/recoil';

import { onMessageReceivedForeground } from '@utils/fcm';

// FCM Token 가져오기
export const useFcmToken = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [fcmToken, setFcmToken] = useState<string>('');

  useEffect(() => {
    (async () => {
      // await messaging().registerDeviceForRemoteMessages();
      const tempFcmToken = await messaging().getToken();

      if (tempFcmToken) {
        setFcmToken(tempFcmToken);
      }
    })();
  }, []);

  return [fcmToken, setFcmToken];
};

// FCM Message 수신하기
export const useFcmMessage = () => {
  const isChatInRecoil = useRecoilValue<IsChatInRecoil>(isChatInRecoilState);

  useEffect(() => {
    const unsubscribe = messaging().onMessage((message) => {
      onMessageReceivedForeground(message, isChatInRecoil);
    });

    return unsubscribe;
  }, [isChatInRecoil]);
};

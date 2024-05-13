import { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

// accessToken 가져오기
export const useFcmToken = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [fcmToken, setFcmToken] = useState<string>('');

  useEffect(() => {
    (async () => {
      const tempFcmToken = await messaging().getToken();

      if (tempFcmToken) {
        setFcmToken(tempFcmToken);
      }
    })();
  }, []);

  return [fcmToken, setFcmToken];
};

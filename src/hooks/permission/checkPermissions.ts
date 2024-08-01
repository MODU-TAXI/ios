import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  RESULTS,
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

export const checkFcmPermission = async () => {
  await messaging().requestPermission();
};

/** 초기 온보딩 화면에서의 권한 요청 */
export const checkPermissions = async (): Promise<any> => {
  const results = await checkMultiple([
    PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  ]);

  if (
    results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY] === RESULTS.DENIED ||
    results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY] === RESULTS.LIMITED ||
    results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY] === RESULTS.GRANTED ||
    results[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED ||
    results[PERMISSIONS.IOS.CAMERA] === RESULTS.LIMITED ||
    results[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED ||
    results[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.DENIED ||
    results[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.LIMITED ||
    results[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED ||
    results[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.DENIED ||
    results[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.LIMITED ||
    results[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED
  ) {
    checkNotifications().then(({ status, settings }) => {
      if (status === RESULTS.DENIED || status === RESULTS.LIMITED || status === RESULTS.GRANTED) {
        return requestNotifications(['alert', 'sound']);
      } else {
        throw new Error('알림 에러');
      }
    });

    return requestMultiple([
      PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ]);
  }
};

export const useCheckPermissions = () => {
  useEffect(() => {
    (async () => {
      await checkFcmPermission();
      await checkPermissions();
    })();
  }, []);
};

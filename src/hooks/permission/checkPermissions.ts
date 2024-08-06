import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  check,
  RESULTS,
  request,
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

// fcm 권한 요청
export const checkFcmPermission = async () => {
  await messaging().requestPermission();
};

// 카메라 권한 요청
export const checkCameraPermission = async () => {
  const result = await check(PERMISSIONS.IOS.CAMERA);

  if (result === RESULTS.GRANTED) return true;

  if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
    checkNotifications().then(({ status, settings }) => {
      if (status === RESULTS.DENIED || status === RESULTS.LIMITED || status === RESULTS.GRANTED) {
        return requestNotifications(['alert', 'sound']);
      } else {
        throw new Error('Dont open');
      }
    });

    const response = await request(PERMISSIONS.IOS.CAMERA);

    if (response === 'blocked') {
      return false;
    }

    return true;
  }

  return false;
};

// 앨범 접근 권한 요청
export const checkAlbumPermission = async () => {
  const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

  if (result === RESULTS.GRANTED) return true;

  if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
    checkNotifications().then(({ status, settings }) => {
      if (status === RESULTS.DENIED || status === RESULTS.LIMITED || status === RESULTS.GRANTED) {
        return requestNotifications(['alert', 'sound']);
      } else {
        throw new Error('Dont open');
      }
    });

    const response = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

    if (response === 'blocked') {
      return false;
    }

    return true;
  }

  return false;
};

/** 초기 온보딩 화면에서의 권한 요청 */
export const checkAppPermissions = async (): Promise<any> => {
  const results = await checkMultiple([
    PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  ]);

  if (
    results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY] === RESULTS.DENIED ||
    results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY] === RESULTS.LIMITED ||
    results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY] === RESULTS.GRANTED ||
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
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ]);
  }
};

export const useCheckPermissions = () => {
  useEffect(() => {
    (async () => {
      await checkFcmPermission();
      await checkAppPermissions();
    })();
  }, []);
};

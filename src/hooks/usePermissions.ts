import { useEffect } from 'react';
import {
  check,
  checkNotifications,
  checkMultiple,
  PERMISSIONS,
  request,
  requestMultiple,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

function usePermissions() {
  // 권한 관련
  useEffect(() => {
    // 알림

    // 카메라 권한 요청
    checkMultiple([
      PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ])
      .then((results) => {
        if (
          results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY] ===
            RESULTS.DENIED ||
          results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY] ===
            RESULTS.LIMITED ||
          results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY] ===
            RESULTS.GRANTED ||
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
            if (
              status === RESULTS.DENIED ||
              status === RESULTS.LIMITED ||
              status === RESULTS.GRANTED
            ) {
              console.log('알림: ' + status);
              return requestNotifications(['alert', 'sound']);
            } else {
              console.log('알림: ' + status);
              throw new Error('알림 에러');
            }
          });
          console.log(
            '추적허용: ' + results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY],
          );
          console.log('카메라: ' + results[PERMISSIONS.IOS.CAMERA]);
          console.log('갤러리: ' + results[PERMISSIONS.IOS.PHOTO_LIBRARY]);
          console.log('위치: ' + results[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
          return requestMultiple([
            PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          ]);
        } else {
          console.log(
            '추적허용: ' + results[PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY],
          );
          console.log('카메라: ' + results[PERMISSIONS.IOS.CAMERA]);
          console.log('갤러리: ' + results[PERMISSIONS.IOS.PHOTO_LIBRARY]);
          console.log('위치: ' + results[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
          throw new Error('카메라 지원 안 함');
        }
      })
      .catch(console.error);
  }, []);
}

export default usePermissions;

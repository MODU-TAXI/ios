import {
  checkMultiple,
  checkNotifications,
  IOSPermission,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

/** 초기 온보딩 화면에서의 권한 요청 */
async function checkPermissions(): Promise<any> {
  try {
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
        if (
          status === RESULTS.DENIED ||
          status === RESULTS.LIMITED ||
          status === RESULTS.GRANTED
        ) {
          return requestNotifications(['alert', 'sound']);
        } else {
          console.log('알림: ' + status);
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
  } catch (error) {
    console.error(error);
  }
}

export default checkPermissions;

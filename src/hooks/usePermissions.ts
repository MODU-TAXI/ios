import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import {
  check,
  checkNotifications,
  PERMISSIONS,
  request,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

function usePermissions() {
  // 권한 관련
  useEffect(() => {
    // 추적 금지 요청
    // check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
    // .then(result => {
    //   if (
    //     result === RESULTS.DENIED ||
    //     result === RESULTS.LIMITED ||
    //     result === RESULTS.GRANTED
    //   ) {
    //     return request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    //   } else {
    //     console.log(result);
    //     throw new Error('추적 금지 요청 에러');
    //   }
    // })
    // .catch(console.error);

    // 알림
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

    // 카메라 권한 요청
    check(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        if (
          result === RESULTS.DENIED ||
          result === RESULTS.LIMITED ||
          result === RESULTS.GRANTED
        ) {
          console.log('카메라: ' + result);
          return request(PERMISSIONS.IOS.CAMERA);
        } else {
          console.log('카메라: ' + result);
          throw new Error('카메라 지원 안 함');
        }
      })
      .catch(console.error);

    // 위치 권한 요청
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => {
        if (
          result === RESULTS.BLOCKED ||
          result === RESULTS.DENIED ||
          result === RESULTS.GRANTED
        ) {
          console.log('위치: ' + result);
          return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          // Alert.alert(
          //   '이 앱은 백그라운드 위치 권한 허용이 필요합니다.',
          //   '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
          //   [
          //     {
          //       text: '네',
          //       onPress: () => Linking.openSettings(),
          //     },
          //     {
          //       text: '아니오',
          //       onPress: () => console.log('No Pressed'),
          //       style: 'cancel',
          //     },
          //   ],
          // );
        } else {
          console.log('위치: ' + result);
          throw new Error('위치 지원 안 함');
        }
      })
      .catch(console.error);
  }, []);
}

export default usePermissions;

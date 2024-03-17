import { useEffect } from 'react';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { Alert, Linking } from 'react-native';

/** 카메라 권한 BLOCKED 이면 다시 요청 */
function useCameraPermission() {
  useEffect(() => {
    check(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        if (
          result === RESULTS.BLOCKED ||
          result === RESULTS.DENIED ||
          result === RESULTS.LIMITED
        ) {
          Alert.alert(
            '이 앱은 카메라 권한 허용이 필요합니다.',
            '앱 설정 화면을 열어서 허용으로 바꿔주세요.',
            [
              {
                text: '네',
                onPress: () => Linking.openSettings(),
              },
              {
                text: '아니오',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
            ],
          );
        } else {
          console.log(result);
          console.log('카메라 권한 부여됨');
        }
      })
      .catch(console.error);
  }, []);
}

export default useCameraPermission;

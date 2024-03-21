import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import { Alert, Linking } from 'react-native';

/** 위치 권한 BLOCKED 이면 다시 요청 */
async function useLocationPermission() {
  try {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (
      result === RESULTS.BLOCKED ||
      result === RESULTS.DENIED ||
      result === RESULTS.LIMITED
    ) {
      Alert.alert(
        '이 앱은 위치 권한 허용이 필요합니다.',
        '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
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
      console.log('위치 권한 부여됨');
    }
  } catch (error) {
    console.error(error);
  }
}

export default useLocationPermission;

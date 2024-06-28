import { useState, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { check, RESULTS, PERMISSIONS } from 'react-native-permissions';

export const useLocationPermission = () => {
  const [locationPermission, setLocationPermission] = useState('');
  
  useEffect(() => {
    const checkLocationPermission = async () => {
      const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      setLocationPermission(result);

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
              style: 'cancel',
            },
          ],
        );
      }
    }
    checkLocationPermission();
  }, []);

  return locationPermission;
}

// /** 위치 권한 BLOCKED 이면 다시 요청 */
// async function checkLocationPermission() {
//   try {
//     const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

//     if (
//       result === RESULTS.BLOCKED ||
//       result === RESULTS.DENIED ||
//       result === RESULTS.LIMITED
//     ) {
//       Alert.alert(
//         '이 앱은 위치 권한 허용이 필요합니다.',
//         '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
//         [
//           {
//             text: '네',
//             onPress: () => Linking.openSettings(),
//           },
//           {
//             text: '아니오',
//             onPress: () => console.log('No Pressed'),
//             style: 'cancel',
//           },
//         ],
//       );
//     } else {
//       console.log('위치 권한 부여됨');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// export default checkLocationPermission;

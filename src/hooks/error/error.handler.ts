import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '@type/ParamLists';

// 네비게이션 스택에서 사용되는 네비게이션 프로퍼티 타입
type NavigationType = NavigationProp<RootStackParamList>;

export const errorHandler = (error: any, navigation: NavigationType) => {
  if (error.code === 'MEMBER_004') {
    const snsId = error.message;
    async () => {
      await AsyncStorage.setItem('snsId', snsId);
    };

    navigation.navigate('CheckPermissionScreen');
  } else {
    navigation.navigate('SignInScreen');
  }
};

import { Alert } from 'react-native';
import { SetterOrUpdater } from 'recoil';
import { NavigationProp } from '@react-navigation/native';

import { deleteToken } from '@utils/token';
import { ErrorToastMessage } from '@utils/toastMessage';

import { LoginStackParamList } from '@type/param/loginStack';

export const mutateErrorHandler = async (
  error: any,
  setLoggedIn: SetterOrUpdater<boolean>,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
  // 토큰 관련 에러 -> 모두 로그아웃 처리
  if (error.code === 'TOKEN_ERROR') {
    setLoggedIn(false);
    Alert.alert('로그아웃 되었습니다.');
  }

  // 서버에러가 아닌 경우
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    // message 객체가 전달된 경우
    if (error?.response?.data?.message) {
      // 화면에 표시해주어야 하는 에러들
      if (setErrorMessage) {
        return setErrorMessage(error.response?.data?.message);
      }

      // 나머지는 toast message로 대체
      return ErrorToastMessage(error.response?.data?.message);
    }
  }

  // 나머지 서버 에러들 status 500~
  return ErrorToastMessage('문제가 발생하였습니다. 다시 시도하세요');
};

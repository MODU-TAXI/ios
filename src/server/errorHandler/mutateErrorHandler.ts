import { Alert } from 'react-native';
import { SetterOrUpdater } from 'recoil';

import { ErrorToastMessage, BottomErrorToastMessage } from '@utils/toastMessage';

export const mutateErrorHandler = async (
  error: any,
  setLoggedIn: SetterOrUpdater<boolean>,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
  bottom?: boolean,
): Promise<void> => {
  // 토큰 관련 에러 -> 모두 로그아웃 처리
  if (error.code === 'TOKEN_ERROR') {
    setLoggedIn(false);
    Alert.alert('로그아웃 되었습니다.');
  }

  // 서버에러가 아닌 경우
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    // 회원가입 플로우의 경우 메세지 출력 X
    if (error?.response?.data?.code === 'MEMBER_004') {
      return;
    }
    // message 객체가 전달된 경우
    else if (error?.response?.data?.message) {
      // 화면에 표시해주어야 하는 에러들
      if (setErrorMessage) {
        return setErrorMessage(error.response?.data?.message);
      }

      if (bottom) {
        return BottomErrorToastMessage(error.response?.data?.message);
      }

      // 나머지는 toast message로 대체
      return ErrorToastMessage(error.response?.data?.message);
    }
  }

  // 나머지 서버 에러들 status 500~
  return ErrorToastMessage('문제가 발생하였습니다. 다시 시도하세요');
};

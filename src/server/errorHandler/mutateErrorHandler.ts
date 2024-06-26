import { ErrorToastMessage } from '@utils/toastMessage';

export const mutateErrorHandler = (
  error: any,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): void => {
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

import { ErrorToastMessage } from '@utils/toastMessage';

enum OnboardingErrorCode {
  ONBOARDING_001 = '존재하지 않는 설문조사 ID 입니다.',
}

export const onBoardingErrorHandler = (
  error: any,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): void => {
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    // 메세지를 toast message로 표시해줘야하는 에러들
    return ErrorToastMessage('메일 인증에 실패했습니다. 다시 시도하세요');
  }

  // 나머지 서버 에러들 -> 어떻게 할지 정의
  return ErrorToastMessage('메일 인증에 실패했습니다. 다시 시도하세요');
};

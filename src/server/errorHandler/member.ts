import { ErrorToastMessage } from '@utils/toastMessage';

enum OnboardingErrorCode {
  MEMBER_001 = '존재하지 않는 사용자입니다.',
  MEMBER_002 = '중복된 사용자입니다.',
  MEMBER_003 = '중복된 닉네임입니다.',
  MEMBER_004 = '',
  MEMBER_005 = '유효하지 않은 로그인 키입니다.',
}

export const MemberErrorHandler = (
  error: any,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): void => {
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    if (error?.response?.data?.code === 'MEMBER_001') {
      // 여기서는 초기 페이지로 이동 시키기
      return ErrorToastMessage('잘못된 접근입니다.');
    } else if (error?.response?.data?.code === 'MEMBER_002') {
      // 여기서는 초기 페이지로 이동 시키기
      return ErrorToastMessage('잘못된 접근입니다.');
    } else if (error?.response?.data?.code === 'MEMBER_003') {
      // 여기서는 초기 페이지로 이동 시키기
      return ErrorToastMessage('잘못된 접근입니다.');
    } else if (error?.response?.data?.code === 'MEMBER_004') {
      // 여기서는 초기 페이지로 이동 시키기
      return ErrorToastMessage('잘못된 접근입니다.');
    } else if (error?.response?.data?.code === 'MEMBER_005') {
      // 여기서는 초기 페이지로 이동 시키기
      return ErrorToastMessage('잘못된 접근입니다.');
    }

    // 메세지를 toast message로 표시해줘야하는 에러들
    return ErrorToastMessage('잘못된 접근입니다.');
  }

  // 나머지 서버 에러들 -> 어떻게 할지 정의
  return ErrorToastMessage('잘못된 접근입니다.');
};

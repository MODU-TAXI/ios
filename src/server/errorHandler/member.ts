import { ErrorToastMessage } from '@utils/toastMessage';

enum MemberErrorCode {
  MEMBER_001 = '존재하지 않는 사용자입니다.',
  MEMBER_002 = '중복된 사용자입니다.',
  MEMBER_003 = '이미 있는 닉네임이에요!',
  MEMBER_004 = '',
  MEMBER_005 = '유효하지 않은 로그인 키입니다.',
  MEMBER_006 = '한글, 영어, 숫자만 사용할 수 있어요!',
  MEMBER_007 = '닉네임은 최소 2글자부터 가능해요!',
  MEMBER_008 = '닉네임은 최대 12글자까지 가능해요!',
  MEMBER_009 = '사용할 수 없는 단어가 포함되어 있어요!',
}

export const memberErrorHandler = (
  error: any,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): void => {
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    if (error?.response?.data?.code === 'MEMBER_001' && setErrorMessage) {
      return ErrorToastMessage('잘못된 접근입니다.');
    } else if (error?.response?.data?.code === 'MEMBER_002' && setErrorMessage) {
      return ErrorToastMessage('잘못된 접근입니다.');
    } else if (error?.response?.data?.code === 'MEMBER_003' && setErrorMessage) {
      return setErrorMessage(MemberErrorCode.MEMBER_003);
    } else if (error?.response?.data?.code === 'MEMBER_004' && setErrorMessage) {
      return ErrorToastMessage('잘못된 접근입니다.');
    } else if (error?.response?.data?.code === 'MEMBER_005' && setErrorMessage) {
      return ErrorToastMessage('잘못된 접근입니다.');
    } else if (error?.response?.data?.code === 'MEMBER_006' && setErrorMessage) {
      return setErrorMessage(MemberErrorCode.MEMBER_006);
    } else if (error?.response?.data?.code === 'MEMBER_007' && setErrorMessage) {
      return setErrorMessage(MemberErrorCode.MEMBER_007);
    } else if (error?.response?.data?.code === 'MEMBER_008' && setErrorMessage) {
      return setErrorMessage(MemberErrorCode.MEMBER_008);
    } else if (error?.response?.data?.code === 'MEMBER_009' && setErrorMessage) {
      return setErrorMessage(MemberErrorCode.MEMBER_009);
    }

    // 메세지를 toast message로 표시해줘야하는 에러들
    return ErrorToastMessage('잘못된 접근입니다.');
  }

  // 나머지 서버 에러들 -> 어떻게 할지 정의
  return ErrorToastMessage('잘못된 접근입니다.');
};

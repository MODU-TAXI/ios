import { ErrorToastMessage } from '@utils/toastMessage';

enum MemberMailErrorCode {
  MAIL_002 = '메세지 발송해 실패했습니다.',
  MAIL_003 = '유효하지 않은 이메일 형식입니다.',
  MAIL_004 = '지원하지 않는 도메인입니다',
  MAIL_005 = '이미 사용중인 이메일입니다.',
  MAIL_006 = '인증 코드가 만료되었습니다.',
  MAIL_007 = '인증코드가 일치하지 않습니다.',
  MAIL_008 = '이미 발송된 인증메일 요청입니다.',
  MAIL_009 = '이미 인증된 계정입니다.',
}

export const memberMailErrorHandler = (
  error: any,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): void => {
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    // 메세지를 화면에 표시해줘야하는 에러들
    if (error?.response?.data?.code == 'MAIL_003' && setErrorMessage) {
      return setErrorMessage(MemberMailErrorCode.MAIL_003);
    } else if (error?.response?.data?.code == 'MAIL_004' && setErrorMessage) {
      return setErrorMessage(MemberMailErrorCode.MAIL_004);
    } else if (error?.response?.data?.code == 'MAIL_005' && setErrorMessage) {
      return setErrorMessage(MemberMailErrorCode.MAIL_005);
    } else if (error?.response?.data?.code == 'MAIL_006' && setErrorMessage) {
      return setErrorMessage(MemberMailErrorCode.MAIL_006);
    } else if (error?.response?.data?.code == 'MAIL_007' && setErrorMessage) {
      return setErrorMessage(MemberMailErrorCode.MAIL_007);
    } else if (error?.response?.data?.code == 'MAIL_008' && setErrorMessage) {
      return setErrorMessage(MemberMailErrorCode.MAIL_008);
    } else if (error?.response?.data?.code == 'MAIL_009' && setErrorMessage) {
      return setErrorMessage(MemberMailErrorCode.MAIL_009);
    }
    // 메세지를 toast message로 표시해줘야하는 에러들
    return ErrorToastMessage('메일 인증에 실패했습니다. 다시 시도하세요');
  }

  // 나머지 서버 에러들 -> 어떻게 할지 정의
  return ErrorToastMessage('메일 인증에 실패했습니다. 다시 시도하세요');
};

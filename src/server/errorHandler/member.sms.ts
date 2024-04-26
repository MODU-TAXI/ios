import { ErrorToastMessage } from '@utils/toastMessage';

enum MemberSmsErrorCode {
  SMS_001 = '인증번호가 만료되었거나 없습니다.',
  SMS_002 = '인증번호를 요청한 번호와 일치하지 않습니다.',
  SMS_003 = '인증번호가 일치하지 않습니다.',
  SMS_004 = '이미 인증번호가 발송되었습니다.',
  SMS_005 = '인증번호가 발송중입니다.',
  SMS_006 = '유효하지 않은 전화번호 형식입니다.',
  SMS_007 = '유효하지 않은 인증코드 형식입니다.',
}

export const memberSmsErrorHandler = (
  error: any,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): void => {
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    // 메세지를 화면에 표시해줘야하는 에러들
    if (error?.response?.data?.code == 'SMS_001' && setErrorMessage) {
      return setErrorMessage(MemberSmsErrorCode.SMS_001);
    } else if (error?.response?.data?.code == 'SMS_002' && setErrorMessage) {
      return setErrorMessage(MemberSmsErrorCode.SMS_002);
    } else if (error?.response?.data?.code == 'SMS_003' && setErrorMessage) {
      return setErrorMessage(MemberSmsErrorCode.SMS_003);
    } else if (error?.response?.data?.code == 'SMS_004' && setErrorMessage) {
      return setErrorMessage(MemberSmsErrorCode.SMS_004);
    } else if (error?.response?.data?.code == 'SMS_005' && setErrorMessage) {
      return setErrorMessage(MemberSmsErrorCode.SMS_005);
    } else if (error?.response?.data?.code == 'SMS_006' && setErrorMessage) {
      return setErrorMessage(MemberSmsErrorCode.SMS_006);
    } else if (error?.response?.data?.code == 'SMS_007' && setErrorMessage) {
      return setErrorMessage(MemberSmsErrorCode.SMS_007);
    }

    // 메세지를 toast message로 표시해줘야하는 에러들
    return ErrorToastMessage('sms 인증에 실패했습니다. 다시 시도하세요');
  }

  // 나머지 서버 에러들 -> 어떻게 할지 정의
  return ErrorToastMessage('sms 인증에 실패했습니다. 다시 시도하세요');
};

import { GuestPostAxiosInstance } from '@axios/guest.axios.method';

import {
  SmsConfirmRequest,
  SmsAuthenticationRequest,
} from '@server/requestTypes/member.sms';
import {
  SmsConfirmResponse,
  SmsAuthenticationResponse,
} from '@server/responseTypes/member.sms';

// [sms 인증 메일 발송] /api/members/sms/certificate
export const smsAuthentication = async (data: SmsAuthenticationRequest) => {
  const response = await GuestPostAxiosInstance<SmsAuthenticationResponse>(
    '/api/members/sms/certificate',
    data,
  );

  return response.data;
};

// [sms 인증코드 확인] /api/members/sms/confirm
export const smsConfirm = async (data: SmsConfirmRequest) => {
  const response = await GuestPostAxiosInstance<SmsConfirmResponse>(
    '/api/members/sms/confirm',
    data,
  );

  return response.data;
};

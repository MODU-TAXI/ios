import { PostAxiosInstance } from '@axios/axios.method';
import { GuestPostAxiosInstance } from '@axios/guest.axios.method';

import {
  SmsConfirmRequest,
  SmsChangeConfirmRequest,
  SmsAuthenticationRequest,
  SmsChangeAuthenticationRequest,
} from '@server/requestTypes/member.sms';
import {
  SmsConfirmResponse,
  SmsChangeConfirmResponse,
  SmsAuthenticationResponse,
  SmsChangeAuthenticationResponse,
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

// [sms 변경 인증 메일 발송] /api/members/sms/certificate
export const smsChangeAuthentication = async (data: SmsChangeAuthenticationRequest) => {
  const response = await PostAxiosInstance<SmsChangeAuthenticationResponse>(
    '/api/members/sms/change/certificate',
    data,
  );

  return response.data;
};

// [sms 변경 인증코드 확인] /api/members/sms/confirm
export const smsChangeConfirm = async (data: SmsChangeConfirmRequest) => {
  const response = await PostAxiosInstance<SmsChangeConfirmResponse>(
    '/api/members/sms/change/confirm',
    data,
  );

  return response.data;
};

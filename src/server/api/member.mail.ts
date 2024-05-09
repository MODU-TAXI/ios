import { PostAxiosInstance } from '@axios/axios.method';

import {
  EmailConfirmRequest,
  EmailAuthenticationRequest,
} from '@server/requestTypes/member.mail';
import {
  EmailConfirmResponse,
  EmailAuthenticationResponse,
} from '@server/responseTypes/member.mail';

// [이메일 인증 메일 발송] /api/members/mail/certificate
export const emailAuthentication = async (data: EmailAuthenticationRequest) => {
  const response = await PostAxiosInstance<EmailAuthenticationResponse>(
    '/api/members/mail/certificate',
    data,
  );

  return response.data;
};

// [이레일 인증코드 확인] /api/members/mail/confirm
export const emailConfirm = async (data: EmailConfirmRequest) => {
  const response = await PostAxiosInstance<EmailConfirmResponse>(
    '/api/members/mail/confirm',
    data,
  );

  return response.data;
};

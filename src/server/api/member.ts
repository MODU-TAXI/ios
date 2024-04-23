import { PostAxiosInstance } from '@axios/axios.method';
import {
  GuestPostAxiosInstance,
  GuestGetAxiosInstance,
  GuestPatchAxiosInstance,
  GuestDeleteAxiosInstance,
} from '@axios/guest.axios.method';
import {
  CheckMembershipRequest,
  EmailAuthenticationRequest,
  SignUpRequest,
  SocialLoginRequest,
} from '@server/resquestTypes/member';
import {
  CheckMembershipResponse,
  EmailAuthenticationResponse,
  SignUpResponse,
  SocialLoginResponse,
} from '@server/responseTypes/member';

// [가입 여부 확인] /api/members/{type}/membership
export const checkMembershipApi = async (
  type: 'KAKAO' | 'APPLE',
  data: CheckMembershipRequest,
): Promise<CheckMembershipResponse> => {
  const response = await GuestPostAxiosInstance<CheckMembershipResponse>(
    `/api/members/${type}/membership`,
    data,
  );

  return response.data;
};

// [소셜 로그인] /api/members/{type}/login
export const socialLogin = async (
  type: 'KAKAO' | 'APPLE',
  data: SocialLoginRequest,
): Promise<SocialLoginResponse> => {
  const response = await GuestPostAxiosInstance<SocialLoginResponse>(
    `/api/members/${type}/login`,
    data,
  );

  return response.data;
};

// [소셜 회원가입] /api/members/sign-up
export const signUpApi = async (
  data: SignUpRequest,
): Promise<SignUpResponse> => {
  const response = await GuestPostAxiosInstance<SignUpResponse>(
    `/api/members/sign-up`,
    data,
  );

  return response.data;
};

// [이메일 인증 메일 발송] /api/members/mail/certificate
export const emailAuthentication = async (data: EmailAuthenticationRequest) => {
  const response = await PostAxiosInstance<EmailAuthenticationResponse>(
    '/api/members/mail/certificate',
    data,
  );

  return response.data;
};

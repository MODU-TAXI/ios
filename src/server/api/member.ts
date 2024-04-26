import { GuestPostAxiosInstance } from '@axios/guest.axios.method';
import {
  CheckMembershipRequest,
  SignUpRequest,
  SocialLoginRequest,
} from '@server/requestTypes/member';
import {
  CheckMembershipResponse,
  SignUpResponse,
  SocialLoginResponse,
} from '@server/responseTypes/member';

// [가입 여부 확인] /api/members/{type}/membership
export const checkMembership = async (
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
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await GuestPostAxiosInstance<SignUpResponse>(
    `/api/members/sign-up`,
    data,
  );

  return response.data;
};

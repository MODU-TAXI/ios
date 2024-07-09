import axios from 'axios';
import Config from 'react-native-config';

import { GuestPostAxiosInstance } from '@axios/guest.axios.method';
import { PostAxiosInstance, PatchAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';

import {
  SignUpRequest,
  SocialLoginRequest,
  PatchMemberRequest,
  CheckMembershipRequest,
  RegisterNicknameRequest,
} from '@server/requestTypes/member';
import {
  SignUpResponse,
  SocialLoginResponse,
  PatchMemberResponse,
  RefreshTokenResponse,
  CheckMembershipResponse,
  RegisterNicknameResponse,
} from '@server/responseTypes/member';

// [토큰 재발급] /api/members/refresh
export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const response = await axios.patch(
    `${Config.SERVER_URL}api/members/refresh`,
    {},
    { headers: { refreshToken: refreshToken } },
  );

  return response.data;
};

// [닉네임 설정] /api/members/nickname
export const registerNickname = async (
  data: RegisterNicknameRequest,
): Promise<RegisterNicknameResponse> => {
  const response = await PostAxiosInstance<RegisterNicknameResponse>('/api/members/nickname', data);

  return response.data;
};

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
): Promise<{data: SocialLoginResponse, status: number}> => {
  const response = await GuestPostAxiosInstance<SocialLoginResponse>(
    `/api/members/${type}/login`,
    data,
  );

  return {data: response.data, status: response.status};
};

// [소셜 회원가입] /api/members/sign-up
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await GuestPostAxiosInstance<SignUpResponse>(`/api/members/sign-up`, data);

  return response.data;
};

// [맴버 프로필 변경] /api/members
export const patchMember = async (data: PatchMemberRequest): Promise<PatchMemberResponse> => {
  const response = await PatchAxiosInstance<PatchMemberResponse>('/api/members', data);

  return response.data;
};

// [회원 탈퇴] /api/members
export const deleteMember = async () => {
  const response = await DeleteAxiosInstance('/api/members');

  return response.data;
};

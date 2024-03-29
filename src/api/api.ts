import {
  PostAxiosInstance,
  GetAxiosInstance,
  DeleteAxiosInstance,
  PatchAxiosInstance,
} from '@api/axios.method';
import { SocialLoginResponse } from '@type/response.types';
import { SocialLoginRequest } from '@type/request.types';

// register-member-controller
export const socialLoginApi = async (
  type: 'KAKAO' | 'APPLE',
  data: SocialLoginRequest,
): Promise<SocialLoginResponse> => {
  const response = await PostAxiosInstance<SocialLoginResponse>(
    `/api/members/${type}/login`,
    data,
  );

  return response.data;
};

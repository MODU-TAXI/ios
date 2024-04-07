import {
  PostAxiosInstance,
  GetAxiosInstance,
  DeleteAxiosInstance,
  PatchAxiosInstance,
} from '@axios/axios.method';
import {
  CheckMembershipRequest,
  SignUpRequest,
} from '@server/resquestTypes/member';
import {
  CheckMembershipResponse,
  SignUpResponse,
} from '@server/responseTypes/member';

export const checkMembershipApi = async (
  type: 'KAKAO' | 'APPLE',
  data: CheckMembershipRequest,
): Promise<CheckMembershipResponse> => {
  const response = await PostAxiosInstance(
    `/api/members/${type}/membership`,
    data,
  );

  return response.data;
};

export const signUpApi = async (
  data: SignUpRequest,
): Promise<SignUpResponse> => {
  const response = await PostAxiosInstance<SignUpResponse>(
    `/api/members/sign-up`,
    data,
  );

  return response.data;
};

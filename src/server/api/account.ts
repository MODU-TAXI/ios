import { GetAxiosInstance, PostAxiosInstance } from '@axios/axios.method';

import { RegisterAccountRequest } from '@server/requestTypes/account';
import { GetAccountResponse, RegisterAccountResponse } from '@server/responseTypes/account';

// [계좌 등록] /api/accounts
export const registerAccount = async (
  data: RegisterAccountRequest,
): Promise<RegisterAccountResponse> => {
  const response = await PostAxiosInstance<RegisterAccountResponse>(`/api/accounts`, data);

  return response.data;
};

// [계좌 목록 조회] /api/accounts
export const getAccounts = async (): Promise<GetAccountResponse> => {
  const response = await GetAxiosInstance<GetAccountResponse>(`/api/accounts`);

  return response.data;
};

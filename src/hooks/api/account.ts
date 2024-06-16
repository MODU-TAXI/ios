import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { getAccounts, registerAccount } from '@server/api/account';
import { RegisterAccountRequest } from '@server/requestTypes/account';

import { ErrorToastMessage } from '@utils/toastMessage';

// 계좌 목록 조회
export const useGetAccounts = () => {
  const { data: accounts, refetch: getAccountsRefetch } = useSuspenseQuery({
    queryKey: [`/api/accounts`],
    queryFn: getAccounts,
  });

  return { accounts, getAccountsRefetch };
};

// 계좌 등록
export const useRegisterAccount = () => {
  return useMutation({
    mutationFn: (registerAccountRequest: RegisterAccountRequest) =>
      registerAccount(registerAccountRequest),

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

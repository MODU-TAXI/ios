import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { getAccounts, registerAccount } from '@server/api/account';
import { RegisterAccountRequest } from '@server/requestTypes/account';
import { mutateErrorHandler } from '@server/errorHandler/mutateErrorHandler';

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
      mutateErrorHandler(error);
    },
  });
};

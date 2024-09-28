import { useRecoilState } from 'recoil';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { IsLoggedInRecoil } from '@recoil/types/user';
import { isLoggedInRecoilState } from '@recoil/states/user';

import { RegisterAccountRequest } from '@server/requestTypes/account';
import { mutateErrorHandler } from '@server/errorHandler/mutateErrorHandler';
import { getAccounts, deleteAccount, registerAccount } from '@server/api/account';

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
  const [, setIsLoggedInRecoil] = useRecoilState<IsLoggedInRecoil>(isLoggedInRecoilState);

  return useMutation({
    mutationFn: (registerAccountRequest: RegisterAccountRequest) =>
      registerAccount(registerAccountRequest),

    onError: (error: any) => {
      mutateErrorHandler(error, setIsLoggedInRecoil);
    },
  });
};

// 계좌 삭제
export const useDeleteAccount = () => {
  const [, setIsLoggedInRecoil] = useRecoilState<IsLoggedInRecoil>(isLoggedInRecoilState);

  return useMutation({
    mutationFn: (accountId: number) => deleteAccount(accountId),

    onError: (error: any) => {
      mutateErrorHandler(error, setIsLoggedInRecoil, undefined, true);
    },
  });
};

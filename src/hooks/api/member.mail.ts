import { useRecoilState } from 'recoil';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { IsLoggedInRecoil } from '@recoil/type';
import { isLoggedInRecoilState } from '@recoil/recoil';

import { emailConfirm, emailAuthentication } from '@server/api/member.mail';
import { mutateErrorHandler } from '@server/errorHandler/mutateErrorHandler';
import { EmailConfirmRequest, EmailAuthenticationRequest } from '@server/requestTypes/member.mail';

// 이메일인증
export const useEmailAuthentication = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, EmailAuthenticationRequest> => {
  const [, setIsLoggedInRecoil] = useRecoilState<IsLoggedInRecoil>(isLoggedInRecoilState);

  return useMutation({
    mutationFn: (emailAuthenticationRequest: EmailAuthenticationRequest) =>
      emailAuthentication(emailAuthenticationRequest),
    onError: (error: any) => {
      mutateErrorHandler(error, setIsLoggedInRecoil, setErrorMessage);
    },
  });
};

// 이메일 인증 확인
export const useEmailConfirm = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, EmailConfirmRequest> => {
  const [, setIsLoggedInRecoil] = useRecoilState<IsLoggedInRecoil>(isLoggedInRecoilState);

  return useMutation({
    mutationFn: (emailConfirmRequest: EmailConfirmRequest) => emailConfirm(emailConfirmRequest),
    onError: (error: any) => {
      mutateErrorHandler(error, setIsLoggedInRecoil, setErrorMessage);
    },
  });
};

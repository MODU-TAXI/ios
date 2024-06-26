import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { emailConfirm, emailAuthentication } from '@server/api/member.mail';
import { mutateErrorHandler } from '@server/errorHandler/mutateErrorHandler';
import { EmailConfirmRequest, EmailAuthenticationRequest } from '@server/requestTypes/member.mail';

// 이메일인증
export const useEmailAuthentication = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, EmailAuthenticationRequest> => {
  return useMutation({
    mutationFn: (emailAuthenticationRequest: EmailAuthenticationRequest) =>
      emailAuthentication(emailAuthenticationRequest),
    onError: (error: any) => {
      mutateErrorHandler(error, setErrorMessage);
    },
  });
};

// 이메일 인증 확인
export const useEmailConfirm = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, EmailConfirmRequest> => {
  return useMutation({
    mutationFn: (emailConfirmRequest: EmailConfirmRequest) => emailConfirm(emailConfirmRequest),
    onError: (error: any) => {
      mutateErrorHandler(error, setErrorMessage);
    },
  });
};

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import {
  EmailAuthenticationRequest,
  EmailConfirmRequest,
} from '@server/requestTypes/member.mail';
import { emailAuthentication, emailConfirm } from '@server/api/memeber.mail';
import { memberMailErrorHandler } from '@server/errorHandler/memeber.mail';

// 이메일인증
export const useEmailAuthentication = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, EmailAuthenticationRequest> => {
  return useMutation({
    mutationFn: (emailAuthenticationRequest: EmailAuthenticationRequest) =>
      emailAuthentication(emailAuthenticationRequest),
    onError: (error: any) => {
      memberMailErrorHandler(error, setErrorMessage);
    },
  });
};

// 이메일 인증 확인
export const useEmailConfirm = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, EmailConfirmRequest> => {
  return useMutation({
    mutationFn: (emailConfirmRequest: EmailConfirmRequest) =>
      emailConfirm(emailConfirmRequest),
    onError: (error: any) => {
      memberMailErrorHandler(error, setErrorMessage);
    },
  });
};

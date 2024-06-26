import { useRecoilState } from 'recoil';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { loggedInState } from '@recoil/recoil';

import { smsConfirm, smsAuthentication } from '@server/api/member.sms';
import { mutateErrorHandler } from '@server/errorHandler/mutateErrorHandler';
import { SmsConfirmRequest, SmsAuthenticationRequest } from '@server/requestTypes/member.sms';

// sms인증
export const useSmsAuthentication = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, SmsAuthenticationRequest> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: (smsAuthenticationRequest: SmsAuthenticationRequest) =>
      smsAuthentication(smsAuthenticationRequest),
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn, setErrorMessage);
    },
  });
};

// sms 인증 확인
export const useSmsConfirm = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, SmsConfirmRequest> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: (smsConfirmRequest: SmsConfirmRequest) => smsConfirm(smsConfirmRequest),
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn, setErrorMessage);
    },
  });
};

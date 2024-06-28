import { useRecoilState } from 'recoil';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { loggedInState } from '@recoil/recoil';

import { mutateErrorHandler } from '@server/errorHandler/mutateErrorHandler';
import {
  smsConfirm,
  smsChangeConfirm,
  smsAuthentication,
  smsChangeAuthentication,
} from '@server/api/member.sms';
import {
  SmsConfirmRequest,
  SmsChangeConfirmRequest,
  SmsAuthenticationRequest,
  SmsChangeAuthenticationRequest,
} from '@server/requestTypes/member.sms';

// sms 인증
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

// sms 변경 인증
export const useSmsChangeAuthentication = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, SmsChangeAuthenticationRequest> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: (smsChangeAuthenticationRequest: SmsChangeAuthenticationRequest) =>
      smsChangeAuthentication(smsChangeAuthenticationRequest),
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn, setErrorMessage);
    },
  });
};

// sms 변경 인증 확인
export const useSmsChangeConfirm = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, SmsChangeConfirmRequest> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: (smsChangeConfirmRequest: SmsChangeConfirmRequest) =>
      smsChangeConfirm(smsChangeConfirmRequest),
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn, setErrorMessage);
    },
  });
};

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { smsAuthentication, smsConfirm } from '@server/api/member.sms';
import {
  SmsAuthenticationRequest,
  SmsConfirmRequest,
} from '@server/requestTypes/member.sms';
import { memberSmsErrorHandler } from '@server/errorHandler/member.sms';

// sms인증
export const useSmsAuthentication = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, SmsAuthenticationRequest> => {
  return useMutation({
    mutationFn: (smsAuthenticationRequest: SmsAuthenticationRequest) =>
      smsAuthentication(smsAuthenticationRequest),
    onError: (error: any) => {
      memberSmsErrorHandler(error, setErrorMessage);
    },
  });
};

// sms 인증 확인
export const useSmsConfirm = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<void, void, SmsConfirmRequest> => {
  return useMutation({
    mutationFn: (smsConfirmRequest: SmsConfirmRequest) =>
      smsConfirm(smsConfirmRequest),
    onError: (error: any) => {
      memberSmsErrorHandler(error, setErrorMessage);
    },
  });
};

// [SMS 인증 메세지 발송] /api/members/sms/certificate
export interface SmsAuthenticationResponse {
  isConfirm: boolean;
}

// [SMS 인증 확인] /api/members/sms/confirm
export interface SmsConfirmResponse {
  isConfirm: boolean;
}

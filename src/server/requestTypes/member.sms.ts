// [SMS 인증 메세지 발송] /api/members/sms/certificate
export interface SmsAuthenticationRequest {
  key: string;
  phoneNumber: string;
}

// [SMS 인증 확인] /api/members/sms/confirm
export interface SmsConfirmRequest {
  key: string;
  phoneNumber: string;
  certificationCode: string;
}

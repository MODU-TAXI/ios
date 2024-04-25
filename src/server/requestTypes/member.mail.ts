// [이메일 인증] /api/members/mail/certificate
export interface EmailAuthenticationRequest {
  mailAddress: string;
}

// [이레일 인증코드 확인] /api/members/mail/confirm
export interface EmailConfirmRequest {
  certCode: string;
}

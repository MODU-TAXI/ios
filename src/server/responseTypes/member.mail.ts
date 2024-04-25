// [이메일 인증] /api/members/mail/certificate
export interface EmailAuthenticationResponse {
  isConfirm: boolean;
}

// [이레일 인증코드 확인] /api/members/mail/confirm
export interface EmailConfirmResponse {
  isConfirm: boolean;
}

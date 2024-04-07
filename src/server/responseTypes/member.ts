// [가입 여부 확인] /api/members/{type}/membership
export interface CheckMembershipResponse {
  existent: boolean;
  key: string | null;
}

// [소셜 로그인] /api/members/{type}/login
export interface SocialLoginResponse {
  accessToken: string;
  refreshToken: string;
}

// [소셜 회원가입] /api/members/sign-up
export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
}

// [이메일 인증] /api/members/mail/certificate
export interface EmailAuthenticationResponse {
  isConfirm: boolean;
}

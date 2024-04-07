// [가입 여부 확인] /api/members/{type}/membership
export interface CheckMembershipRequest {
  accessToken: string;
}

// [소셜 로그인] /api/members/{type}/login
export interface SocialLoginRequest {
  accessToken: string;
}

// [소셜 회원가입] /api/members/sign-up
export interface SignUpRequest {
  key: string;
  name: string;
  gender: string;
  phoneNumber: string;
}

// [이메일 인증] /api/members/mail/certificate
export interface EmailAuthenticationRequest {
  receiver: string;
}

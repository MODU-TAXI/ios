// [토큰 재발급] /api/members/refresh
export interface RefreshTokenResponse {
  tokenResponse: {
    accessToken: string;
    refreshToken: string;
  };
  memberInfoResponse: {
    id: number;
    name: string;
    gender: string;
    phoneNumber: string;
    email: string;
    score: number;
  };
}

// [카카오 sdk 로그인]
export interface KakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  scopes: string[];
}

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

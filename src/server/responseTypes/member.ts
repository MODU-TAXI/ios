// [토큰 재발급] /api/members/refresh
export interface RefreshTokenResponse {
  tokenResponse: {
    accessToken: string;
    refreshToken: string;
  };
  memberInfoResponse: {
    id: number;
    name: string;
    nickname: string;
    gender: string;
    phoneNumber: string;
    email: string;
    imageUrl: string;
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

// [애플 sdk 로그인]
export interface AppleLoginResponse {
  user: string;
  email: string;
  authorizedScopes: string[];
  fullName: {
    namePrefix: string,
    givenName: string,
    familyName: string,
    nickname: string,
    middleName: string,
    nameSuffix: string
  };
  identityToken: string;
  authorizationCode: string;
  realUserStatus: number;
  state: string;
  nonce: string;
}

// [닉네임 설정] /api/members/nickname
export interface RegisterNicknameResponse {
  nickname: string;
}

// [가입 여부 확인] /api/members/{type}/membership
export interface CheckMembershipResponse {
  existent: boolean;
  key: string | null;
}

// [소셜 로그인] /api/members/{type}/login
export interface SocialLoginResponse {
  tokenResponse: {
    accessToken: string;
    refreshToken: string;
  };
  memberInfoResponse: {
    id: number;
    name: string;
    nickname: string;
    gender: string;
    phoneNumber: string;
    email: string;
    imageUrl: string;
  };
}

// [소셜 회원가입] /api/members/sign-up
export interface SignUpResponse {
  tokenResponse: {
    accessToken: string;
    refreshToken: string;
  };
  memberInfoResponse: {
    id: number;
    name: string;
    nickname: string;
    gender: string;
    phoneNumber: string;
    email: string;
    imageUrl: string;
  };
}

// [멤버 프로필 변경] /api/members
export interface PatchMemberResponse {
  name: string;
  gender: string;
  phoneNumber: string;
  imageUrl: string;
}

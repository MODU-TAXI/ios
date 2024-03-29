// api/members/{type}/login
interface SocialLoginRequest {
  accessToken: string;
}

// api/members/sign-up
interface SignUpRequest {
  key: string;
  name: string;
  gender: string;
  phoneNumber: string;
}

export type { SocialLoginRequest, SignUpRequest };

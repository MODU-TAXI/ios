export interface CheckMembershipResponse {
  existent: boolean;
  key: string | null;
}

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
}

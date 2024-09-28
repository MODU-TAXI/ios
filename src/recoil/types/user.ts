export type TempUserRecoil = {
  key: string;
  name: string;
  gender: string;
  phoneNumber: string;
};

export type UserRecoil = {
  id: number;
  name: string;
  nickname: string;
  gender: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;
  matchingCount: number;
  blocked: boolean;
};

export type TempEmailRecoil = string;

export type IsLoggedInRecoil = boolean;

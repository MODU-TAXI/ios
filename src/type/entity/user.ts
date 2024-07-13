export type User = {
  id: number;
  name: string;
  nickname: string;
  gender: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;
};

export type UserPreview = {
  memberId: number;
  nickname: string;
  imageUrl: string;
  thisIsMe: boolean;
};

export type PaymentUser = {
  id: number;
  nickName: string;
  name: string;
  imageUrl: string;
  status: 'COMPLETE' | 'INCOMPLETE';
  me: boolean;
};

export type UserInfo = {
  id: number;
  name: string;
  nickname: string;
  gender: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;
  matchingCount: number;
  blocked: boolean;
}
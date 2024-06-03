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

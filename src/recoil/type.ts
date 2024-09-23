import { Bank } from '@type/entity/account';
import { UserPreview } from '@type/entity/user';

export type TempUserRecoil = {
  key: string;
  name: string;
  gender: string;
  phoneNumber: string;
};

export type IsLoggedInRecoil = boolean;

export type TempEmailRecoil = string;

export type IsChatInRecoil = boolean;

export type MessageBody = {
  first: boolean;
  last: boolean;
  content: string;
  dateTime: Date;
  memberId: number;
  roomId: number;
  sender: string;
  imageUrl: string;
  messageType: string;
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
};

export type Departure = {
  name: string;
  latitude: number;
  longitude: number;
};

export type Arrival = {
  name: string;
  spotId: number;
};

export type Calculate = {
  name: string;
  account: string;
  accountId: number;
  bank: Bank;
  amount: string;
  users: UserPreview[];
};

export type SearchParam = {
  title: string;
  latitude: number;
  longitude: number;
};

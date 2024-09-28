import { Bank } from '@type/entity/account';
import { UserPreview } from '@type/entity/user';

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

export type DepartureRecoil = {
  name: string;
  latitude: number;
  longitude: number;
};

export type ArrivalRecoil = {
  name: string;
  spotId: number;
};

export type SettlementRecoil = {
  name: string;
  account: string;
  accountId: number;
  bank: Bank;
  amount: string;
  users: UserPreview[];
};

export type SearchParamRecoil = {
  title: string;
  latitude: number;
  longitude: number;
};

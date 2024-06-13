import { UserPreview } from '@type/entity/user';

export type SignUpUser = {
  key: string;
  name: string;
  gender: string;
  phoneNumber: string;
};

export type MessageBody = {
  content: string;
  dateTime: Date;
  memberId: number;
  roomId: number;
  sender: string;
  imageUrl: string;
  messageType: 'JOIN' | 'CHAT' | 'LEAVE';
};

export type UserInfo = {
  id: number;
  name: string;
  nickname: string;
  gender: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;
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
  account: string;
  bank: string;
  amount: string;
  users: UserPreview[];
};

export type SearchParam = {
  title: string,
  latitude: number,
  longitude: number,
}
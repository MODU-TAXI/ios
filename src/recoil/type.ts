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
}

export type Arrival = {
  name: string;
  spotId: number;
}
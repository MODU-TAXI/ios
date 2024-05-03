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

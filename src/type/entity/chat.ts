export type ChatMessage = {
  first: boolean;
  last: boolean;
  roomId: number;
  messageType: string;
  content: string;
  sender: string;
  memberId: number;
  dateTime: Date;
  imageUrl: string;
};

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

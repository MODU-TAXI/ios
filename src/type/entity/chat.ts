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

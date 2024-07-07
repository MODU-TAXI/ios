export type ChatMessage = {
  first: boolean;
  last: boolean;
  roomId: number;
  messageType: 'JOIN' | 'CHAT' | 'LEAVE';
  content: string;
  sender: string;
  memberId: number;
  dateTime: Date;
  imageUrl: string;
};

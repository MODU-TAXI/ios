export type ChatMessage = {
  roomId: number;
  messageType: 'JOIN' | 'CHAT' | 'LEAVE';
  content: string;
  sender: string;
  memberId: number;
  dateTime: Date;
  imageUrl: string;
};

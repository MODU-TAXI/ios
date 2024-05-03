interface Message {
  roomId: 0;
  messageType: 'JOIN' | 'CHAT' | 'LEAVE';
  content: string;
  sender: string;
  memberId: string;
  dateTime: Date;
}

// [나의 채팅방 정보] /api/members/mail/certificate
export interface GetChatInfoResponse {
  roomId: number;
  memberId: number;
}

// [채팅 전부 조회] /chat-messages/{roomId}
export interface GetChatMessagesResponse extends Array<Message> {}

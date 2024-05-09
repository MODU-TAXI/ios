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

// [채팅 전부 조회] /api/chats/rooms/{roomId}/messages
export interface GetChatMessagesResponse {
  messages: Message[];
}

// [모집방 참여 가능 확인] /chat/{roomId}
// export interface CheckJoinRoomRespones extends boolean {}

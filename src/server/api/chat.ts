import { GetAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';

import { GetChatInfoResponse, GetChatMessagesResponse } from '@server/responseTypes/chat';

// [나의 채팅방 정보] /api/chats/info
export const getMyChatInfo = async (): Promise<GetChatInfoResponse> => {
  const response = await GetAxiosInstance<GetChatInfoResponse>(`/api/chats/info`);

  return response.data;
};

// [채팅방 퇴장] /chat-info
export const deleteMyChatInfo = async (): Promise<string> => {
  const response = await DeleteAxiosInstance<string>('/chat-info');

  return response.data;
};

// [채팅 전부 조회] /api/chats/rooms/{roomId}/messages
export const getChatMessages = async (roomId: number): Promise<GetChatMessagesResponse> => {
  const response = await GetAxiosInstance<GetChatMessagesResponse>(
    `/api/chats/rooms/${roomId}/messages`,
  );

  return response.data;
};

// [모집방 참여 가능 확인] /chat/{roomId}
export const CheckJoinRoomEnable = async (roomId: number): Promise<any> => {
  const response = await GetAxiosInstance<any>(`/chat/${roomId}`);

  return response.data;
};

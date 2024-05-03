import {
  PostAxiosInstance,
  GetAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';
import {
  GetChatInfoResponse,
  GetChatMessagesResponse,
} from '@server/responseTypes/chat';

// [나의 채팅방 정보] /api/members/mail/certificate
export const getMyChatInfo = async (): Promise<GetChatInfoResponse> => {
  const response = await GetAxiosInstance<GetChatInfoResponse>(`/chat-info`);

  return response.data;
};

// [채팅방 퇴장] /chat-info
export const deleteMyChatInfo = async (): Promise<string> => {
  const response = await DeleteAxiosInstance<string>('/chat-info');

  return response.data;
};

// [채팅 전부 조회] /chat-messages/{roomId}
export const getChatMessages = async (
  roomId: number,
): Promise<GetChatMessagesResponse> => {
  const response = await GetAxiosInstance<GetChatMessagesResponse>(
    `/chat-messages/${roomId}`,
  );

  return response.data;
};

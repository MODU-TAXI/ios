import {
  PostAxiosInstance,
  GetAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';
import { CreateMatchRequest } from '@server/requestTypes/room';

export const getMyChatInfo = async (): Promise<any> => {
  const response = await GetAxiosInstance<any>(`/chat-info`);

  return response.data;
};

export const deleteMyChatInfo = async (): Promise<any> => {
  const response = await DeleteAxiosInstance<any>('/chat-info');

  return response.data;
};

export const getChatMessages = async (roomId: number): Promise<any> => {
  const response = await GetAxiosInstance<any>(`/chat-messages/${roomId}`);

  return response.data;
};

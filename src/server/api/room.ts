import {
  PostAxiosInstance,
  GetAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';
import { CreateMatchRequest } from '@server/resquestTypes/room';

export const createMatch = async (data: CreateMatchRequest): Promise<any> => {
  const response = await PostAxiosInstance<any>(`/api/rooms`, data);

  return response.data;
};

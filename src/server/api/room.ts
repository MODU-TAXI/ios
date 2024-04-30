import {
  PostAxiosInstance,
  GetAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';
import { CreateMatchRequest } from '@server/requestTypes/room';
import { RoomResponse } from '@server/responseTypes/map';

// [방 등록] /api/rooms
export const createMatch = async (data: CreateMatchRequest): Promise<any> => {
  const response = await PostAxiosInstance<any>(`/api/rooms`, data);

  return response.data;
};

// [원형 영역 내 방 조회] /api/rooms/map
export const checkRoomCurrentCamera = async (
  longitude: number,
  latitude: number,
  // spotId?: number,
  radius?: number,
): Promise<RoomResponse[]> => {
  const response = await GetAxiosInstance<any>(
    `/api/rooms/map?radius=${radius}&longitude=${longitude}&latitude=${latitude}`,
  );

  return response.data.rooms;
};

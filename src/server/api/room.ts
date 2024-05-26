import {
  GetAxiosInstance,
  PostAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';

import { PatchRoomRequest, CreateRoomRequest } from '@server/requestTypes/room';
import {
  JoinRoomResponse,
  PatchRoomResponse,
  CreateRoomResponse,
  DeleteRoomResponse,
  GetRoomListResponse,
  GetRoomDetailResponse,
  GetRoomMembersResponse,
  GetRoomPreviewResponse,
  ApproveJoinRoomResponse,
  GetRoomCurrentCameraResponse,
  GetRoomWaitingMembersResponse,
} from '@server/responseTypes/room';

// [모집방 생성] /api/rooms
export const createRoom = async (data: CreateRoomRequest): Promise<CreateRoomResponse> => {
  const response = await PostAxiosInstance<CreateRoomResponse>(`/api/rooms`, data);

  return response.data;
};

// [모집방 수정] /api/rooms/{id}
export const patchRoom = async (
  roomId: number,
  data: PatchRoomRequest,
): Promise<PatchRoomResponse> => {
  const response = await PatchAxiosInstance<PatchRoomResponse>(`/api/rooms/${roomId}`, data);

  return response.data;
};

// [모집 방 삭제] /api/rooms/{id}
export const deleteRoom = async (roomId: number): Promise<DeleteRoomResponse> => {
  const response = await DeleteAxiosInstance<DeleteRoomResponse>(`/api/rooms/${roomId}`);

  return response.data;
};

// [원형 영역 내 방 조회] /api/rooms/map
export const getRoomCurrentCamera = async (
  searchLongitude: number,
  searchLatitude: number,
  radius?: number,
  spotId?: number,
  roomTags?: string[],
  isImminent?: boolean,
): Promise<GetRoomCurrentCameraResponse> => {
  const params: any = {
    searchLongitude: searchLongitude,
    searchLatitude: searchLatitude,
  };

  radius && (params.radius = radius);
  spotId && (params.spotId = spotId);
  roomTags && (params.roomTags = roomTags);
  isImminent && (params.isImminent = isImminent);

  const response = await GetAxiosInstance<GetRoomCurrentCameraResponse>(`/api/rooms/map`, {
    params: params,
  });

  return response.data;
};

// [경로를 제외한 방 리스트 조회] /api/rooms/list
export const getRoomList = async (
  page: number,
  size: number,
  searchLongitude: number,
  searchLatitude: number,
  spotId?: number,
  radius?: number,
  roomTags?: string[],
  isImminent?: boolean,
  sortType?: string,
): Promise<GetRoomListResponse[]> => {
  const params: any = {
    page: page,
    size: size,
    searchLongitude: searchLongitude,
    searchLatitude: searchLatitude,
  };

  radius && (params.radius = radius);
  spotId && (params.spotId = spotId);
  roomTags && (params.roomTags = roomTags);
  isImminent && (params.isImminent = isImminent);
  sortType && (params.sortType = sortType);

  const response = await GetAxiosInstance<GetRoomListResponse[]>(`/api/rooms/list`, {
    params: params,
  });

  return response.data;
};

// [방 미리보기 조회] /api/rooms/preview/{id}
export const getRoomPreview = async (id: number): Promise<GetRoomPreviewResponse | null> => {
  if (id > 0) {
    const response = await GetAxiosInstance<GetRoomDetailResponse>(`/api/rooms/preview/${id}`);

    return response.data;
  }

  return null;
};

// [경로를 포함한 방 상세 정보 조회] /api/rooms/{id}
export const getRoomDetail = async (id: number): Promise<GetRoomDetailResponse> => {
  const response = await GetAxiosInstance<GetRoomDetailResponse>(`/api/rooms/${id}`);

  return response.data;
};

// [특정 방 참가 리스트 조회] /api/rooms/{roomId}/members/in
export const getRoomMembers = async (roomId: number): Promise<GetRoomMembersResponse> => {
  const response = await GetAxiosInstance<GetRoomMembersResponse>(
    `/api/rooms/${roomId}/members/in`,
  );

  return response.data;
};

// [대기열 리스트 조회] /api/rooms/{roomId}/members/waiting
export const getRoomWaitingMembers = async (
  roomId: number,
): Promise<GetRoomWaitingMembersResponse> => {
  const response = await GetAxiosInstance<GetRoomWaitingMembersResponse>(
    `/api/rooms/${roomId}/members/waiting`,
  );

  return response.data;
};

// [방 입장 요청] /api/rooms/{roomId}/apply
export const joinRoom = async (roomId: number): Promise<JoinRoomResponse> => {
  const response = await PostAxiosInstance<JoinRoomResponse>(`/api/rooms/${roomId}/apply`);

  return response.data;
};

// [특정 사용자 입장 수락] /api/rooms/{roomId}/memberId/{memberId}/approve
export const approveJoinRoom = async (
  roomId: number,
  memberId: number,
): Promise<ApproveJoinRoomResponse> => {
  const response = await DeleteAxiosInstance<ApproveJoinRoomResponse>(
    `/api/rooms/${roomId}/members/${memberId}/approve`,
  );

  return response.data;
};

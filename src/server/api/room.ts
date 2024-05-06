import {
  PostAxiosInstance,
  GetAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';
import { CreateRoomRequest, PatchRoomRequest } from '@server/requestTypes/room';
import {
  JoinRoomResponse,
  ApproveJoinRoomResponse,
  GetRoomMembersResponse,
  GetRoomWaitingMembersResponse,
  GetRoomDetailResponse,
  CheckRoomResponse,
  CreateRoomResponse,
  PatchRoomResponse,
} from '@server/responseTypes/room';

// [모집방 생성] /api/rooms
export const createRoom = async (
  data: CreateRoomRequest,
): Promise<CreateRoomResponse> => {
  const response = await PostAxiosInstance<CreateRoomResponse>(
    `/api/rooms`,
    data,
  );

  return response.data;
};

// [모집방 수정] /api/rooms/{id}
export const patchRoom = async (
  roomId: number,
  data: PatchRoomRequest,
): Promise<PatchRoomResponse> => {
  const response = await PatchAxiosInstance<PatchRoomResponse>(
    `/api/rooms/${roomId}`,
    data,
  );

  return response.data;
};

// [원형 영역 내 방 조회] /api/rooms/map
export const checkRoomCurrentCamera = async (
  longitude: number,
  latitude: number,
  // spotId?: number,
  radius?: number,
): Promise<CheckRoomResponse[]> => {
  const response = await GetAxiosInstance<any>(
    `/api/rooms/map?radius=${radius}&longitude=${longitude}&latitude=${latitude}`,
  );

  return response.data.rooms;
};

// [경로를 포함한 방 상세 정보 조회] /api/rooms/{id}
export const getRoomDetail = async (
  id: number,
): Promise<GetRoomDetailResponse> => {
  const response = await GetAxiosInstance<GetRoomDetailResponse>(
    `/api/rooms/${id}`,
  );

  return response.data;
};

// [방 입장 요청] /api/rooms/{roomId}/apply
export const JoinRoom = async (roomId: number): Promise<JoinRoomResponse> => {
  const response = await GetAxiosInstance<JoinRoomResponse>(
    `/api/rooms/${roomId}/apply`,
  );

  return response.data;
};

// [특정 사용자 입장 수락] /api/rooms/{roomId}/memberId/{memberId}/approve
export const ApproveJoinRoom = async (
  roomId: number,
  memberId: number,
): Promise<ApproveJoinRoomResponse> => {
  const response = await GetAxiosInstance<ApproveJoinRoomResponse>(
    `/api/rooms/${roomId}/memberId/${memberId}/approve`,
  );

  return response.data;
};

// [특정 방 참가 리스트 조회] /api/rooms/{roomId}/members/in
export const GetRoomMembers = async (
  roomId: number,
): Promise<GetRoomMembersResponse> => {
  const response = await GetAxiosInstance<GetRoomMembersResponse>(
    `/api/rooms/${roomId}/members/in`,
  );

  return response.data;
};

// [대기열 리스트 조회] /api/rooms/{roomId}/members/waiting
export const GetRoomWaitingMembers = async (
  roomId: number,
): Promise<GetRoomWaitingMembersResponse> => {
  const response = await GetAxiosInstance<GetRoomWaitingMembersResponse>(
    `/api/rooms/${roomId}/members/waiting`,
  );

  return response.data;
};

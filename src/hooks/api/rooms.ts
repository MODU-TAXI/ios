import { Coord } from '@mj-studio/react-native-naver-map';
import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  UseMutationResult,
  useSuspenseQueries,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { PatchRoomRequest, CreateRoomRequest, GetRoomListRequest } from '@server/requestTypes/room';
import {
  joinRoom,
  patchRoom,
  createRoom,
  deleteRoom,
  getRoomList,
  getRoomDetail,
  getRoomMembers,
  getRoomPreview,
  approveJoinRoom,
  getRoomCurrentCamera,
  getRoomWaitingMembers,
} from '@server/api/room';
import {
  JoinRoomResponse,
  PatchRoomResponse,
  CreateRoomResponse,
  GetRoomListResponse,
  GetRoomDetailResponse,
  GetRoomMembersResponse,
  GetRoomPreviewResponse,
  ApproveJoinRoomResponse,
  GetRoomCurrentCameraResponse,
  GetRoomWaitingMembersResponse,
} from '@server/responseTypes/room';

import { translateCategory } from '@utils/room';
import { InfoToastMessage, ErrorToastMessage } from '@utils/toastMessage';

import { RoomList, RoomDetail, RoomPreview, RoomsCurrentCamera } from '@type/entity/room';

// 방 생성
export const useCreateRoom = (): UseMutationResult<
  CreateRoomResponse,
  void,
  CreateRoomRequest,
  unknown
> => {
  return useMutation({
    mutationFn: (createRoomRequest: CreateRoomRequest) => createRoom(createRoomRequest),
    onSuccess: async (data: CreateRoomResponse) => {
      InfoToastMessage('파티 생성 성공!');
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

// 특정 방 간략정보 가져오기
export const useGetRoomPreview = (
  roomId: number,
): UseSuspenseQueryResult<GetRoomPreviewResponse, void> => {
  return useSuspenseQuery({
    queryKey: [`/api/rooms/preview/${roomId}`],
    queryFn: () => getRoomPreview(roomId),
  });
};

// 특정 방 정보 모두 가져오기
export const useGetRoomDetail = (roomId: number) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: [`/api/rooms/${roomId}`, roomId],
        queryFn: async () => getRoomDetail(roomId),
        select: (response: GetRoomDetailResponse) => {
          const coords = response.path.coordinates;
          const convertedCoords: Coord[] = coords.map(({ values: [longitude, latitude] }) => ({
            latitude,
            longitude,
          }));

          const convertedRoomTagBitMaskList = response.roomTagBitMaskList.map((roomTagBitMask) =>
            translateCategory(roomTagBitMask),
          );
          return {
            managerId: response.managerId,
            roomId: response.roomId,
            spotId: response.spotId,
            departureDairyDate: response.departureDairyDate,

            arrivalLongitude: response.arrivalLongitude,
            arrivalLatitude: response.arrivalLatitude,
            arrivalTime: response.arrivalTime,
            arrivalName: response.arrivalName,

            departureLongitude: response.departureLongitude,
            departureLatitude: response.departureLatitude,
            departureTime: response.departureTime,
            departureName: response.departureName,

            currentHeadcount: response.currentHeadcount,
            wishHeadcount: response.wishHeadcount,
            durationMinutes: response.durationMinutes,
            expectedChargePerPerson: response.expectedChargePerPerson,
            expectedCharge: response.expectedCharge,
            roomCategories: convertedRoomTagBitMaskList,
            myRoom: response.myRoom,
            participate: response.participate,

            path: {
              coordinateReferenceSystem: response.path.coordinateReferenceSystem,
              coordinates: convertedCoords,
              type: response.path.type,
            },
          };
        },
      },
      {
        queryKey: [`/api/rooms/${roomId}/members/in`, roomId],
        queryFn: async () => getRoomMembers(roomId),
      },
      {
        queryKey: [`/api/rooms/${roomId}/members/waiting`, roomId],
        queryFn: async () => getRoomWaitingMembers(roomId),
      },
    ],
    combine: (results) => {
      return {
        roomDetail: results[0].data,
        participateMembers: results[1].data,
        waitingMembers: results[2].data,
        refetchRoomDetail: results[0].refetch,
        refetcParticipateMembers: results[1].refetch,
        refetchWaitingMembers: results[2].refetch,
        pending: results.some((result) => result.isPending),
      };
    },
  });
};

// 특정 방 가져오기
export const useGetRoom = (
  roomId: number,
): { roomDetail: RoomDetail; getRoomRefetch: () => void } => {
  const { data: roomDetail, refetch: getRoomRefetch } = useSuspenseQuery({
    queryKey: [`/api/rooms/${roomId}`, roomId],
    queryFn: async () => getRoomDetail(roomId),

    select: (response: GetRoomDetailResponse) => {
      const coords = response.path.coordinates;
      const convertedCoords: Coord[] = coords.map(({ values: [longitude, latitude] }) => ({
        latitude,
        longitude,
      }));

      const convertedRoomTagBitMaskList = response.roomTagBitMaskList.map((roomTagBitMask) =>
        translateCategory(roomTagBitMask),
      );
      return {
        managerId: response.managerId,
        roomId: response.roomId,
        spotId: response.spotId,
        departureDairyDate: response.departureDairyDate,

        arrivalLongitude: response.arrivalLongitude,
        arrivalLatitude: response.arrivalLatitude,
        arrivalTime: response.arrivalTime,
        arrivalName: response.arrivalName,

        departureLongitude: response.departureLongitude,
        departureLatitude: response.departureLatitude,
        departureTime: response.departureTime,
        departureName: response.departureName,

        currentHeadcount: response.currentHeadcount,
        wishHeadcount: response.wishHeadcount,
        durationMinutes: response.durationMinutes,
        expectedChargePerPerson: response.expectedChargePerPerson,
        expectedCharge: response.expectedCharge,
        roomCategories: convertedRoomTagBitMaskList,
        myRoom: response.myRoom,
        participate: response.participate,

        path: {
          coordinateReferenceSystem: response.path.coordinateReferenceSystem,
          coordinates: convertedCoords,
          type: response.path.type,
        },
      };
    },
  });

  return { roomDetail, getRoomRefetch };
};

// 참가자 리스트 가져오기
export const useGetRoomMembers = (
  roomId: number,
): {
  roomMembers: GetRoomMembersResponse;
  getRoomMembersRefetch: () => void;
} => {
  const { data: roomMembers, refetch: getRoomMembersRefetch } = useSuspenseQuery({
    queryKey: [`/api/rooms/${roomId}/members/in`, roomId],
    queryFn: async () => getRoomMembers(roomId),
  });

  return { roomMembers, getRoomMembersRefetch };
};

// 대기자 리스트 가져오기
export const useGetRoomWaitingMembers = (
  roomId: number,
): {
  roomWaitingMembers: GetRoomWaitingMembersResponse;
  getRoomWaitingMembersRefetch: () => void;
} => {
  const { data: roomWaitingMembers, refetch: getRoomWaitingMembersRefetch } = useSuspenseQuery({
    queryKey: [`/api/rooms/${roomId}/members/waiting`, roomId],
    queryFn: async () => getRoomWaitingMembers(roomId),
  });

  return { roomWaitingMembers, getRoomWaitingMembersRefetch };
};

// 원형 영역 방 조회
export const useGetRoomCurrentCamera = (
  searchLongitude: number,
  searchLatitude: number,
  radius?: number,
  spotId?: number,
  roomTags?: string[],
  isImminent?: boolean,
): { rooms: RoomsCurrentCamera['rooms']; refetch: () => void } => {
  const { data: rooms, refetch } = useSuspenseQuery({
    queryKey: [
      'getRoomCurrentCamera',
      searchLongitude,
      searchLatitude,
      radius,
      spotId,
      roomTags,
      isImminent,
    ],
    queryFn: () =>
      getRoomCurrentCamera(searchLongitude, searchLatitude, radius, spotId, roomTags, isImminent),
    select: (response: GetRoomCurrentCameraResponse) => {
      return response.rooms;
    },
  });
  return { rooms, refetch };
};

// 경로를 제외한 방 리스트 조회
export const useGetRoomList = (
  data: GetRoomListRequest
): { rooms: RoomList[]; refetch: () => void } => {
  const { data: rooms, refetch } = useSuspenseQuery({
    queryKey: [
      `/api/rooms/map`,
      data.page,
      data.size,
      data.searchLongitude,
      data.searchLatitude,
      data.sortType,
      data.spotId,
      data.radius,
      data.roomTags,
      data.isImminent,
    ],
    queryFn: () =>
      getRoomList(data),
    select: (response: GetRoomListResponse[]) => {
      return response;
    },
  });

  return { rooms, refetch };
};

// 방 수정
export const usePatchRoom = (
  roomId: number,
): UseMutationResult<PatchRoomResponse, void, PatchRoomRequest, unknown> => {
  return useMutation({
    mutationFn: (patchRoomRequest: PatchRoomRequest) => patchRoom(roomId, patchRoomRequest),
    onSuccess: async () => {
      // 수정시에는 invalidateQueries를 통해 기존 데이터 캐싱시키기?
      InfoToastMessage('파티 수정 성공!');
    },

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

// 방 삭제
export const useDeleteRoom = (roomId: number) => {
  return useMutation({
    mutationFn: () => deleteRoom(roomId),
    onSuccess: async () => {
      InfoToastMessage('파티 삭제 성공!');
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

// 방 입장
export const useJoinRoom = (
  roomId: number,
): UseMutationResult<JoinRoomResponse, void, number, unknown> => {
  return useMutation({
    mutationFn: () => joinRoom(roomId),
    onSuccess: async () => {
      InfoToastMessage('파티 입장 성공!');
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

// 방 입장 수락
export const useApproveJoinRoom = (
  roomId: number,
): UseMutationResult<ApproveJoinRoomResponse, void, number, unknown> => {
  return useMutation({
    mutationFn: (memberId: number) => approveJoinRoom(roomId, memberId),
    onSuccess: async () => {
      InfoToastMessage('파티 입장 성공!');
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

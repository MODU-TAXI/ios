import {
  useMutation,
  UseMutationResult,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Coord } from '@mj-studio/react-native-naver-map';
import {
  getRoomDetail,
  createRoom,
  joinRoom,
  patchRoom,
  getRoomCurrentCamera,
  deleteRoom,
  approveJoinRoom,
  getRoomMembers,
  getRoomWaitingMembers,
} from '@server/api/room';
import { CreateRoomRequest, PatchRoomRequest } from '@server/requestTypes/room';
import {
  ApproveJoinRoomResponse,
  CreateRoomResponse,
  GetRoomCurrentCameraResponse,
  GetRoomDetailResponse,
  GetRoomMembersResponse,
  GetRoomWaitingMembersResponse,
  JoinRoomResponse,
  PatchRoomResponse,
} from '@server/responseTypes/room';
import { ErrorToastMessage, InfoToastMessage } from '@utils/toastMessage';
import { translateCategory } from '@utils/room';
import { RoomCurrentCamera, RoomDetail } from '@type/entity/room';

// 방 생성
export const useCreateRoom = (): UseMutationResult<
  CreateRoomResponse,
  void,
  CreateRoomRequest,
  unknown
> => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createRoomRequest: CreateRoomRequest) =>
      createRoom(createRoomRequest),
    onSuccess: async (data: CreateRoomResponse) => {
      // const roomId = data.roomId;

      // queryClient.setQueryData<GetRoomDetailResponse>(
      //   [`/api/rooms`, roomId],
      //   data,
      // );

      InfoToastMessage('파티 생성 성공!');
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

// 특정 방 가져오기
export const useGetRoom = (
  roomId: number,
): { roomDetail: RoomDetail; getRoomRefetch: () => void } => {
  const { data: roomDetail, refetch: getRoomRefetch } = useSuspenseQuery({
    queryKey: [`/api/rooms`, roomId],
    queryFn: () => getRoomDetail(roomId),
    // staleTime: 30000,
    // gcTime: 30000,
    select: (response: GetRoomDetailResponse) => {
      const coords = response.path.coordinates;
      const convertedCoords: Coord[] = coords.map(
        ({ values: [longitude, latitude] }) => ({
          latitude,
          longitude,
        }),
      );

      const convertedRoomTagBitMaskList = response.roomTagBitMaskList.map(
        (roomTagBitMask) => translateCategory(roomTagBitMask),
      );

      console.log(response);
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
  const { data: roomMembers, refetch: getRoomMembersRefetch } =
    useSuspenseQuery({
      queryKey: [`/api/rooms/${roomId}/members/in`, roomId],
      queryFn: () => getRoomMembers(roomId),
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
  const { data: roomWaitingMembers, refetch: getRoomWaitingMembersRefetch } =
    useSuspenseQuery({
      queryKey: [`/api/rooms/${roomId}/members/waiting`, roomId],
      queryFn: () => getRoomWaitingMembers(roomId),
    });

  return { roomWaitingMembers, getRoomWaitingMembersRefetch };
};

// 원형 영역 방 조회
export const useGetRoomCurrentCamera = (
  longitude: number,
  latitude: number,
  radius: number,
): { rooms: RoomCurrentCamera['rooms']; refetch: () => void } => {
  const { data: rooms, refetch } = useSuspenseQuery({
    queryKey: [
      `/api/rooms/map?radius=${radius}&longitude=${longitude}&latitude=${latitude}`,
    ],
    queryFn: () => getRoomCurrentCamera(longitude, latitude, radius),
    select: (response: GetRoomCurrentCameraResponse) => {
      return response.rooms;
    },
  });

  return { rooms, refetch };
};

// 방 수정
export const usePatchRoom = (
  roomId: number,
): UseMutationResult<PatchRoomResponse, void, PatchRoomRequest, unknown> => {
  return useMutation({
    mutationFn: (patchRoomRequest: PatchRoomRequest) =>
      patchRoom(roomId, patchRoomRequest),
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

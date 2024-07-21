import { useRecoilState } from 'recoil';
import { Coord } from '@mj-studio/react-native-naver-map';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  useSuspenseQuery,
  UseMutationResult,
  useSuspenseQueries,
} from '@tanstack/react-query';

import { loggedInState } from '@recoil/recoil';

import { mutateErrorHandler } from '@server/errorHandler/mutateErrorHandler';
import {
  PatchRoomRequest,
  CreateRoomRequest,
  GetRoomListRequest,
  GetRoomIntegrationRequest,
  GetRoomCurrentCameraRequest,
} from '@server/requestTypes/room';
import {
  joinRoom,
  patchRoom,
  createRoom,
  deleteRoom,
  getRoomList,
  getRoomDetail,
  completeMatch,
  getRoomMembers,
  getRoomPreview,
  approveJoinRoom,
  exitWaitingRoom,
  getRoomIntegration,
  exitParticipateRoom,
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
  GetRoomIntegrationResponse,
  GetRoomCurrentCameraResponse,
  GetRoomWaitingMembersResponse,
} from '@server/responseTypes/room';

import { translateCategory } from '@utils/room';
import { InfoToastMessage, InfoTopToastMessage } from '@utils/toastMessage';

import { RoomList, RoomDetail, RoomIntegration, RoomCurrentCamera } from '@type/entity/room';

// 방 생성
export const useCreateRoom = (): UseMutationResult<
  CreateRoomResponse,
  void,
  CreateRoomRequest,
  unknown
> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: (createRoomRequest: CreateRoomRequest) => createRoom(createRoomRequest),
    onSuccess: () => {
      InfoToastMessage('택시팟 생성이 완료되었어요!');
    },
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn);
    },
  });
};

// 특정 방 간략정보 가져오기
export const useGetRoomPreview = (roomId: number): UseQueryResult<GetRoomPreviewResponse, void> => {
  return useQuery({
    queryKey: [`/api/rooms/preview/${roomId}`],
    queryFn: () => getRoomPreview(roomId),
  });
};

// 특정 방 정보 모두 가져오기
export const useGetRoomDetail = (roomId: number) => {
  const queryClient = useQueryClient();

  const result = useSuspenseQueries({
    queries: [
      {
        queryKey: [`/api/rooms/${roomId}`, roomId],
        queryFn: () => getRoomDetail(roomId),
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

            minLongitude: response.minLongitude,
            minLatitude: response.minLatitude,
            maxLongitude: response.maxLongitude,
            maxLatitude: response.maxLatitude,

            path: {
              coordinateReferenceSystem: response.path.coordinateReferenceSystem,
              coordinates: convertedCoords,
              type: response.path.type,
            },
          };
        },
        gcTime: 1000,
      },
      {
        queryKey: [`/api/rooms/${roomId}/members/in`, roomId],
        queryFn: () => getRoomMembers(roomId),
      },
      {
        queryKey: [`/api/rooms/${roomId}/members/waiting`, roomId],
        queryFn: () => getRoomWaitingMembers(roomId),
      },
    ],

    combine: (results) => {
      return {
        roomDetail: results[0].data,
        participateMembers: results[1].data,
        waitingMembers: results[2].data,
        refetchRoomDetail: results[0].refetch,
        refetchParticipateMembers: results[1].refetch,
        refetchWaitingMembers: results[2].refetch,
        pending: results.some((result) => result.isPending),
        error: results.some((result) => result.error),
      };
    },
  });

  return { ...result, queryClient };
};

// 특정 방 가져오기
export const useGetRoom = (
  roomId: number,
): { roomDetail: RoomDetail; getRoomRefetch: () => void } => {
  const { data: roomDetail, refetch: getRoomRefetch } = useSuspenseQuery({
    queryKey: [`/api/rooms/${roomId}`, roomId],
    queryFn: () => getRoomDetail(roomId),

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

        minLongitude: response.minLongitude,
        minLatitude: response.minLatitude,
        maxLongitude: response.maxLongitude,
        maxLatitude: response.maxLatitude,

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
  const { data: roomWaitingMembers, refetch: getRoomWaitingMembersRefetch } = useSuspenseQuery({
    queryKey: [`/api/rooms/${roomId}/members/waiting`, roomId],
    queryFn: () => getRoomWaitingMembers(roomId),
  });

  return { roomWaitingMembers, getRoomWaitingMembersRefetch };
};

// 원형 영역 방 조회
export const useGetRoomCurrentCamera = (
  data: GetRoomCurrentCameraRequest,
): { rooms: RoomCurrentCamera[]; refetch: () => void } => {
  const { data: rooms, refetch } = useSuspenseQuery({
    queryKey: [
      '/api/rooms/map',
      data.searchLongitude,
      data.searchLatitude,
      data.radius,
      data.spotId,
      data.roomTags,
      data.isImminent,
    ],
    queryFn: () => getRoomCurrentCamera(data),
    select: (response: GetRoomCurrentCameraResponse) => {
      return response.rooms;
    },
  });
  return { rooms, refetch };
};

// 경로를 제외한 방 리스트 조회
export const useGetRoomList = (
  data: GetRoomListRequest,
): { rooms: RoomList[]; refetch: () => void } => {
  const { data: rooms, refetch } = useSuspenseQuery({
    queryKey: [
      `/api/rooms/list`,
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
    queryFn: () => getRoomList(data),
    select: (response: GetRoomListResponse[]) => {
      return response;
    },
  });

  return { rooms, refetch };
};

// 지도, 리스트 통합 조회
export const useGetRoomIntegration = (
  data: GetRoomIntegrationRequest,
): { rooms: RoomIntegration[]; refetch: () => void } => {
  const { data: rooms, refetch } = useSuspenseQuery({
    queryKey: [
      `/api/rooms/integration`,
      data.searchLongitude,
      data.searchLatitude,
      data.sortType,
      data.spotId,
      data.radius,
      data.roomTags,
      data.isImminent,
    ],
    queryFn: () => getRoomIntegration(data),
    select: (response: GetRoomIntegrationResponse[]) => {
      return response;
    },
  });

  return { rooms, refetch };
};

// 방 수정
export const usePatchRoom = (
  roomId: number,
): UseMutationResult<PatchRoomResponse, void, PatchRoomRequest, unknown> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: (patchRoomRequest: PatchRoomRequest) => patchRoom(roomId, patchRoomRequest),
    onSuccess: () => {
      InfoToastMessage('택시팟 수정이 성공하였습니다!');
    },
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn);
    },
  });
};

// 방 삭제
export const useDeleteRoom = (roomId: number) => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: () => deleteRoom(roomId),
    onSuccess: () => {
      InfoToastMessage('택시팟 삭제에 성공하였습니다!');
    },
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn);
    },
  });
};

// 방 입장 요청
export const useJoinRoom = (
  roomId: number,
): UseMutationResult<JoinRoomResponse, void, number, unknown> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: () => joinRoom(roomId),
    onSuccess: () => {
      InfoTopToastMessage('택시팟 참여 신청이 완료되었어요!');
    },
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn);
    },
  });
};

// 방 입장 수락
export const useApproveJoinRoom = (
  roomId: number,
): UseMutationResult<ApproveJoinRoomResponse, void, number, unknown> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: (memberId: number) => approveJoinRoom(roomId, memberId),
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn);
    },
  });
};

// 매칭완료
export const useMatchComplete = (roomId: number) => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: () => completeMatch(roomId),
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn);
    },
  });
};

// 현재 내가 참여하고 있는 방 퇴장
export const useExitParticipateRoom = () => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: () => exitParticipateRoom(),
    onSuccess: () => {
      InfoToastMessage('택시팟 퇴장에 성공하였습니다!');
    },
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn);
    },
  });
};

// 대기열에서 퇴장
export const useExitWaitingRoom = (roomId: number) => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: () => exitWaitingRoom(roomId),
    onSuccess: () => {
      InfoTopToastMessage('택시팟 참여 신청이 취소되었어요!');
    },
    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn);
    },
  });
};

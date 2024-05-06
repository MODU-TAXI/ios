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
  JoinRoom,
  patchRoom,
  getRoomCurrentCamera,
} from '@server/api/room';
import { CreateRoomRequest, PatchRoomRequest } from '@server/requestTypes/room';
import {
  CreateRoomResponse,
  GetRoomCurrentCameraResponse,
  GetRoomDetailResponse,
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
): { roomDetail: RoomDetail; refetch: () => void } => {
  const { data: roomDetail, refetch } = useSuspenseQuery({
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

        path: {
          coordinateReferenceSystem: response.path.coordinateReferenceSystem,
          coordinates: convertedCoords,
          type: response.path.type,
        },
      };
    },
  });

  return { roomDetail, refetch };
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
      // 수정시에는 invalidateQueries를 통해 기존 데이터 캐싱시키기
      InfoToastMessage('파티 수정 성공!');
    },

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

// 방 입장
export const useJoinRoom = (): UseMutationResult<
  JoinRoomResponse,
  void,
  number,
  unknown
> => {
  return useMutation({
    mutationFn: (roomId: number) => JoinRoom(roomId),
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

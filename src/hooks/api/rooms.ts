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
} from '@server/api/room';
import { CreateRoomRequest, PatchRoomRequest } from '@server/requestTypes/room';
import {
  CreateRoomResponse,
  GetRoomDetailResponse,
  JoinRoomResponse,
  PatchRoomResponse,
} from '@server/responseTypes/room';
import { ErrorToastMessage, InfoToastMessage } from '@utils/toastMessage';
import { translateCategory } from '@utils/room';
import { RoomDetail } from '@type/entity/room';

// 방 생성
export const useCreateRoom = (): UseMutationResult<
  CreateRoomResponse,
  void,
  CreateRoomRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createRoomRequest: CreateRoomRequest) =>
      createRoom(createRoomRequest),
    onSuccess: async (data: CreateRoomResponse) => {
      const roomId = data.roomId;

      queryClient.setQueryData([`/api/rooms/${roomId}`], data);

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
    queryKey: [`/api/rooms/${roomId}`],
    queryFn: () => getRoomDetail(roomId),
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

// 방 수정
export const usePatchRoom = (
  roomId: number,
): UseMutationResult<PatchRoomResponse, void, PatchRoomRequest, unknown> => {
  return useMutation({
    mutationFn: (patchRoomRequest: PatchRoomRequest) =>
      patchRoom(roomId, patchRoomRequest),
    onSuccess: async () => {
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

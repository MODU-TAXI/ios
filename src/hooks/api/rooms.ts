import {
  useMutation,
  UseMutationResult,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Coord } from '@mj-studio/react-native-naver-map';
import { getRoomDetail, createRoom } from '@server/api/room';
import { CreateRoomRequest } from '@server/requestTypes/room';
import {
  CreateRoomResponse,
  GetRoomDetailResponse,
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
  return useMutation({
    mutationFn: (createRoomRequest: CreateRoomRequest) =>
      createRoom(createRoomRequest),
    onSuccess: async () => {
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
export const useGetRoom = (roomId: number): RoomDetail => {
  const { data: roomDetail } = useSuspenseQuery({
    queryKey: [`/chat-messages/${roomId}`],
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

  return roomDetail;
};

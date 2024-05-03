import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { checkRoomDetail, createMatch } from '@server/api/room';
import { CreateMatchRequest } from '@server/requestTypes/room';
import { ErrorToastMessage, InfoToastMessage } from '@utils/toastMessage';
import { CheckRoomDetailResponse } from '@server/responseTypes/room';
import { Coord } from '@mj-studio/react-native-naver-map';

// 매칭 팟 생성
export const useCreateMatch = (): UseMutationResult<
  Error,
  void,
  CreateMatchRequest,
  unknown
> => {
  return useMutation({
    mutationFn: (createMatchRequest: CreateMatchRequest) =>
      createMatch(createMatchRequest),
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

export const fetchRoomDetail = async (
  roomId: number,
  setRoomDetail: React.Dispatch<
    React.SetStateAction<CheckRoomDetailResponse | undefined>
  >,
  setCoordinate: React.Dispatch<React.SetStateAction<Coord[]>>,
  setArrivalTime: React.Dispatch<React.SetStateAction<Date | undefined>>,
) => {
  try {
    const data = await checkRoomDetail(roomId);
    setRoomDetail(data);

    // 경로 변환 및 저장
    const coords = data.path.coordinates;
    const convertedCoords: Coord[] = coords.map(
      ({ values: [longitude, latitude] }) => ({
        latitude,
        longitude,
      }),
    );
    setCoordinate(convertedCoords);

    // 도착시간 계산
    const departureTime = data.departureTime;
    const arrivalTime = new Date(departureTime);
    arrivalTime.setMilliseconds(arrivalTime.getMilliseconds() + data.duration);
    setArrivalTime(arrivalTime);
  } catch (error) {
    console.error(error);
  }
};

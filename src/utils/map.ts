import { Camera } from '@mj-studio/react-native-naver-map';
import { RoomResponse } from '@server/responseTypes/map';

/** 현재 카메라 중심 방 탐색 */
export const searchRoomCurrentCamera = ({
  latitude,
  longitude,
  zoom,
}: Camera): RoomResponse[] => {
  console.log(`${latitude}, ${longitude}, ${zoom}`);
  return [
    {
      id: 14,
      longitude: 126.69488,
      latitude: 37.46318,
      spotName: '인하대학교 후문',
    },
    {
      id: 15,
      longitude: 126.656152,
      latitude: 37.451098,
      spotName: '인하대학교 후문',
    },
  ];
};

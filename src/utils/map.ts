import { Camera } from '@mj-studio/react-native-naver-map';
import { checkRoomCurrentCamera } from '@server/api/room';
import { CheckRoomResponse } from '@server/responseTypes/room';

/** 현재 카메라 중심 방 탐색 */
export const fetchRoomCurrentCamera = async (
  longitude: number,
  latitude: number,
  range: number,
  setRooms: React.Dispatch<React.SetStateAction<CheckRoomResponse[]>>,
) => {
  try {
    const rooms = await checkRoomCurrentCamera(longitude, latitude, range);
    setRooms(rooms);
  } catch (error) {
    console.error(error);
  }
};

/** zoom 레벨에 따른 range 조정 */
export const calculateRange = (zoom: number) => {
  return Math.round(10000000 * Math.pow(2, -zoom));
};

/** zoom 레벨에 따른 카메라 센터 조정 */
export const calculateCenter = (zoom: number) => {
  return 0.002 / Math.pow(2, zoom - 13.5);
};

import { Camera } from '@mj-studio/react-native-naver-map';
import { checkRoomCurrentCamera } from '@server/api/room';
import { RoomResponse } from '@server/responseTypes/map';

/** 현재 카메라 중심 방 탐색 */
export const fetchRoomCurrentCamera = async (
  longitude: number,
  latitude: number,
  range: number,
  setRooms: React.Dispatch<React.SetStateAction<RoomResponse[]>>,
) => {
  try {
    console.log(longitude, latitude, range);
    const rooms = await checkRoomCurrentCamera(longitude, latitude, range);
    setRooms(rooms);
  } catch (error) {
    console.error(error);
  }
};

export const calculateRange = (zoom: number) => {
  return Math.round(10000000 * Math.pow(2, -zoom));
};

import { Camera } from '@mj-studio/react-native-naver-map';

/** 현재 카메라 중심 방 탐색 */
export const searchRoomCurrentCamera = ({
  latitude,
  longitude,
  zoom,
}: Camera) => {
  console.log(`${latitude}, ${longitude}, ${zoom}`);
};

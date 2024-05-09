import { Coord } from '@mj-studio/react-native-naver-map';

import { checkSpot } from '@server/api/spot';
import { CheckSpotRequest } from '@server/requestTypes/spot';

export const fetchSpot = async (
  id: number,
  longitude: number,
  latitude: number,
  setSpotName: React.Dispatch<React.SetStateAction<string>>,
  setSpotCoord: React.Dispatch<React.SetStateAction<Coord>>,
) => {
  try {
    const data = await checkSpot({
      id,
      longitude,
      latitude,
    });
    setSpotName(data.name);
    setSpotCoord({
      latitude: data.latitude,
      longitude: data.longitude,
    });
  } catch (error) {
    console.error(error);
  }
};

import { Coord } from "@mj-studio/react-native-naver-map";
import Geolocation from "@react-native-community/geolocation";

/** zoom 레벨에 따른 range 조정 */
export const calculateRadius = (zoom: number) => {
  return Math.round(15000000 * Math.pow(2, -zoom));
};

/** zoom 레벨에 따른 카메라 센터 조정 */
export const calculateCenter = (zoom: number) => {
  return 0.002 / Math.pow(2, zoom - 13.5);
};

/** WGS84 좌표계 위도경도 변환 */
export const convertCoordinates = (mapx: number, mapy: number) => {
  const x = mapx / 10000000.0;
  const y = mapy / 10000000.0;
  return {
    latitude: y,
    longitude: x,
  };
}

/** 현재위치 리턴 함수 */
export const getCurrentLocation = async (): Promise<Coord> => {

  
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = {
          latitude: latitude, 
          longitude: longitude
        };
        resolve(currentLocation);
      },
      (error) => {
        console.error(error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  });
}
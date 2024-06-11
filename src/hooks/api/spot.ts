import { useSuspenseQuery } from '@tanstack/react-query';
import { Coord } from '@mj-studio/react-native-naver-map';

import { checkSpot, getSpotMap, getSpotList } from '@server/api/spot';
import { CheckSpotRequest, GetSpotMapRequest } from '@server/requestTypes/spot';
import { GetSpotMapResponse, GetSpotListResponse } from '@server/responseTypes/spot';

import { Spot, SpotMap } from '@type/entity/spot';

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

export const useGetSpotList = (
  page: number,
  size: number,
  currentLongitude: number,
  currentLatitude: number,
  searchLongitude: number,
  searchLatitude: number,
): { spots: Spot[]; refetch: () => void } => {
  const { data: spots, refetch } = useSuspenseQuery({
    queryKey: [
      `/api/spots/list`,
      page,
      size,
      currentLongitude,
      currentLatitude,
      searchLongitude,
      searchLatitude,
    ],
    queryFn: () => 
      getSpotList(
        page,
        size,
        currentLongitude,
        currentLatitude,
        searchLongitude,
        searchLatitude,
      ),
      select: (response: GetSpotListResponse) => {
      return response.spots;
    },
  });
  return { spots, refetch };
}

export const useGetSpotMap = (
  data: GetSpotMapRequest
): { spots: SpotMap; refetch: () => void } => {
  const { data: spots, refetch } = useSuspenseQuery({
    queryKey: [`/api/spots/map`, data.count, data.searchLongitude, data.searchLatitude],
    queryFn: () =>
      getSpotMap(data),
    select: (response: GetSpotMapResponse) => {
      return response;
    },
  });
  return { spots, refetch };
}
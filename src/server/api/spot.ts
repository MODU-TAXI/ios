import {
  GetAxiosInstance,
  PostAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';

import { CheckSpotRequest } from '@server/requestTypes/spot';
import { CheckSpotResponse, GetSpotListResponse } from '@server/responseTypes/spot';

export const checkSpot = async ({
  id,
  longitude,
  latitude,
}: CheckSpotRequest): Promise<CheckSpotResponse> => {
  const response = await GetAxiosInstance<CheckSpotResponse>(
    `/api/spots/${id}?longitude=${longitude}&latitude=${latitude}`,
  );
  return response.data;
};

// [지점 근처 거점 리스트 조회] /api/spots/list
export const getSpotList = async (
  page: number,
  size: number,
  currentLongitude: number,
  currentLatitude: number,
  searchLongitude: number,
  searchLatitude: number,
): Promise<GetSpotListResponse> => {
  const response = await GetAxiosInstance<GetSpotListResponse>(`/api/spots/list`, {
    params: {
      page: page,
      size: size,
      currentLongitude: currentLongitude,
      currentLatitude: currentLatitude,
      searchLongitude: searchLongitude,
      searchLatitude: searchLatitude,
    },
  });
  return response.data;
}
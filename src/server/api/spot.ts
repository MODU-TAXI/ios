import { GetAxiosInstance } from '@axios/axios.method';

import { CheckSpotRequest, GetSpotMapRequest, GetSpotListRequest } from '@server/requestTypes/spot';
import { CheckSpotResponse, GetSpotMapResponse, GetSpotListResponse } from '@server/responseTypes/spot';

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
  data: GetSpotListRequest
): Promise<GetSpotListResponse> => {
  const response = await GetAxiosInstance<GetSpotListResponse>(`/api/spots/list`, {
    params: {
      page: data.page,
      size: data.size,
      searchLongitude: data.searchLongitude,
      searchLatitude: data.searchLatitude,
    },
  });
  return response.data;
}

export const getSpotMap = async (
  data: GetSpotMapRequest
): Promise<GetSpotMapResponse> => {
  const response = await GetAxiosInstance<GetSpotMapResponse>(`/api/spots/map`, {
    params: {
      count: data.count,
      searchLongitude: data.searchLongitude,
      searchLatitude: data.searchLatitude,
    },
  });
  return response.data;
}
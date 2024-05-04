import {
  PostAxiosInstance,
  GetAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';
import { CheckSpotRequest } from '@server/requestTypes/spot';
import { CheckSpotResponse } from '@server/responseTypes/spot';

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

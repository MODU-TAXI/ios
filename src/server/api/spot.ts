import {
  PostAxiosInstance,
  GetAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';
import { CheckSpotRequest } from '@server/requestTypes/spot';

export const checkSpot = async ({
  id,
  longitude,
  latitude,
}: CheckSpotRequest): Promise<CheckSpotRequest> => {
  const response = await PostAxiosInstance(
    `/api/spots/${id}?longitude=${longitude}&latitude=${latitude}`,
  );
  return response.data;
};

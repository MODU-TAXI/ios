import { GetAxiosInstance } from '@axios/axios.method';

import { getAlaramsResponse } from '@server/responseTypes/alarm';

// [알림들 가져오기] /api/alarms
export const getAlarms = async (page: number): Promise<getAlaramsResponse> => {
  const response = await GetAxiosInstance<getAlaramsResponse>(`/api/alarms?page=${page}&size=20`);

  return response.data;
};

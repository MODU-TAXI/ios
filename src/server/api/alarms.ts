import { GetAxiosInstance } from '@axios/axios.method';

import { GetAlaramsResponse, GetAlarmsCountResponse } from '@server/responseTypes/alarm';

// [알림들 가져오기] /api/alarms
export const getAlarms = async (page: number): Promise<GetAlaramsResponse> => {
  const response = await GetAxiosInstance<GetAlaramsResponse>(`/api/alarms?page=${page}&size=15`);

  return response.data;
};

// [안읽은 알람 개수 가져오기] /api/alarms/counts
export const getAlarmsCount = async (): Promise<GetAlarmsCountResponse> => {
  const response = await GetAxiosInstance<GetAlarmsCountResponse>(`/api/alarms/counts`);

  return response.data;
};

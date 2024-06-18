import { GetAxiosInstance } from '@axios/axios.method';

import {
  HistoriesResponse,
  HistoryDetailResponse,
  HistoriesMonthlyResponse,
} from '@server/responseTypes/history';

// [이용 내역 전체 조회] /api/histories
export const getHistories = async (): Promise<HistoriesResponse> => {
  const response = await GetAxiosInstance<HistoriesResponse>(`/api/histories`);

  return response.data;
};

// [월/연별 이용 내역 상세 조회] /api/histories/monthly
export const getHistoriesByMonth = async (): Promise<HistoriesMonthlyResponse> => {
  const response = await GetAxiosInstance<HistoriesMonthlyResponse>('/api/histories/monthly');

  return response.data;
};

// [이용 내역 상세 조회] /api/histories/{id}
export const getHistoryDetail = async (historyId: number): Promise<HistoryDetailResponse> => {
  const response = await GetAxiosInstance<HistoryDetailResponse>(`/api/histories/${historyId}`);

  return response.data;
};

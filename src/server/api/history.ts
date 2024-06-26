import { GetAxiosInstance } from '@axios/axios.method';

import {
  HistoriesResponse,
  HistoryDetailResponse,
  HistoryDurationResponse,
  HistoriesMonthlyResponse,
} from '@server/responseTypes/history';

// [이용 내역 전체 조회] /api/histories
export const getHistories = async (): Promise<HistoriesResponse> => {
  const response = await GetAxiosInstance<HistoriesResponse>(`/api/histories`);

  return response.data;
};

// [월/연별 이용 내역 상세 조회] /api/histories/monthly
export const getHistoriesByMonth = async (
  year: number,
  month: number,
): Promise<HistoriesMonthlyResponse> => {
  const response = await GetAxiosInstance<HistoriesMonthlyResponse>(
    `/api/histories/monthly?year=${year}&month=${month}`,
  );

  return response.data;
};

// [이용 내역 상세 조회] /api/histories/{id}
export const getHistoryDetail = async (historyId: number): Promise<HistoryDetailResponse> => {
  const response = await GetAxiosInstance<HistoryDetailResponse>(`/api/histories/${historyId}`);

  return response.data;
};

// [내가 생성했던 기록의 시작과 끝 날짜] /api/alarms
export const getHistoryDuration = async (): Promise<HistoryDurationResponse> => {
  const response = await GetAxiosInstance<HistoryDurationResponse>(`/api/histories/duration`);

  return response.data;
};

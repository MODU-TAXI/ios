import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getHistoryDetail, getHistoryDuration, getHistoriesByMonth } from '@server/api/history';

// 이용 내역 전체 조회
export const useGetHistoriesByMonth = (year: number, month: number) => {
  return useQuery({
    queryKey: [`/api/histories/monthly`, [year, month]],
    queryFn: async () => getHistoriesByMonth(year, month),
  });
};

// 이용 내역 상세 조회
export const useGetHistoryDetail = (historyId: number) => {
  return useSuspenseQuery({
    queryKey: [`/api/histories`, historyId],
    queryFn: async () => getHistoryDetail(historyId),
  });
};

// 내가 생성했던 기록의 시작과 끝 날짜
export const useGetHistoryDuration = () => {
  return useQuery({
    queryKey: [`/api/histories/duration`],
    queryFn: getHistoryDuration,
  });
};

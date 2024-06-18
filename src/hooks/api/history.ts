import { useSuspenseQuery } from '@tanstack/react-query';

import { getHistories, getHistoryDetail } from '@server/api/history';

// 이용 내역 전체 조회
export const useGetHistories = () => {
  return useSuspenseQuery({
    queryKey: [`/api/histories`],
    queryFn: getHistories,
  });
};

// 이용 내역 상세 조회
export const useGetHistoryDetail = (historyId: number) => {
  return useSuspenseQuery({
    queryKey: [`/api/histories`, historyId],
    queryFn: async () => getHistoryDetail(historyId),
  });
};

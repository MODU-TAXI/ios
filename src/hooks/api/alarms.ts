import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getAlarms } from '@server/api/alarms';

// 알림들 가져오기
export const useGetAlarms = (page: number) => {
  return useQuery({
    queryKey: [`/api/alarms`, page],
    queryFn: async () => getAlarms(page),
    placeholderData: keepPreviousData,
  });
};

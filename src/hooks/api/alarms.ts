import { useQuery, keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { getAlarms, getAlarmsCount } from '@server/api/alarms';

// 알림들 가져오기
export const useGetAlarms = () => {
  return useInfiniteQuery({
    queryKey: [`/api/alarms`],
    queryFn: ({ pageParam }) => getAlarms(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage.page + 1;
      }

      return null;
    },
  });
};

// 안읽은 알람개수 가져오기
export const useGetAlarmsCount = () => {
  return useQuery({
    queryKey: [`/api/alarms/counts`],
    queryFn: async () => getAlarmsCount(),
  });
};

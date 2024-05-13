import Config from 'react-native-config';
import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { NaverSearch } from '@type/entity/search';

// Naver 검색 커스텀 훅
export const useNaverSearch = (
    query: string
): UseQueryResult<NaverSearch['items'], Error> => {
  return useQuery({
    queryKey: ['naverSearch', query],
    queryFn: async () => {
        const response: AxiosResponse<NaverSearch> = await axios.get(
            `https://openapi.naver.com/v1/search/local.json`, {
              params: {
                query,
                display: 5,
              },
              headers: {
                "X-Naver-Client-Id": Config.X_NAVER_CLIENT_ID,
                "X-Naver-Client-Secret": Config.X_NAVER_CLIENT_SECRET,
              },
            }
        );
        return response.data.items;
    }
  });
};
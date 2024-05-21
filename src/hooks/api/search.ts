import Config from 'react-native-config';
import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { NaverSearch, NaverReverseGeocoding } from '@type/entity/search';

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

export const useReverseGeocoding = (
  latitude: number,
  longitude: number,
): UseQueryResult<NaverReverseGeocoding['results'], Error> => {
  return useQuery({
    queryKey: ['reverseGeocoding', latitude, longitude],
    queryFn: async () => {
      const coords = `${longitude},${latitude}`;
      
      const response: AxiosResponse<NaverReverseGeocoding> = await axios.get(
        `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc`, {
          params: {
            coords: coords,
            // sourcecrs: "epsg:4326",
            // targetcrs: "epsg:4326",
            orders: "admcode,roadaddr",
            output: "json",
          },
          headers: {
            "X-NCP-APIGW-API-KEY-ID": Config.X_NCP_APIGW_API_KEY_ID,
            "X-NCP-APIGW-API-KEY": Config.X_NCP_APIGW_API_KEY
          },
        }
      );
      console.log(response.data.results[0].land)
      return response.data.results;
    }
  })
}
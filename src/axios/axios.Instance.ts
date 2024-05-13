import Config from 'react-native-config';
import axios, { AxiosInstance } from 'axios';

import {
  deleteToken,
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
} from '@utils/token';

// 로그인 한 유저가 사용하는 axiosInstance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      // 여기서도 로그아웃 처리
      throw new Error('토큰 없음');
    }

    config.headers['Authorization'] = accessToken;

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// intercepter에서 토큰 관련 에러 처리
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },

  async (error) => {
    // 토큰 만료되었을때 토큰 갱신
    if (error.response?.data?.code === 'AUTH_003') {
      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          // 여기서도 로그아웃 처리
          throw new Error('토큰 없음');
        }

        // refresh 요청
        const response = await axios.patch(
          `${Config.SERVER_URL}api/members/refresh`,
          {},
          { headers: { refreshToken: refreshToken } },
        );

        console.log('토큰 갱신');
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        await setAccessToken(newAccessToken);
        await setRefreshToken(newRefreshToken);

        // 만료때문에 반려된 api 재요청 보내기
        return axiosInstance(error.config);
      } catch (refreshTokenError) {
        // 여기선 무슨 에러가 발생하더라도 로그아웃 처리
        console.log('로그아웃 처리하세요');
        await deleteToken();
        // return Promise.reject(error.response.data);
      }
    }

    // 잘못된 토큰 -> 로그 아웃
    if (
      error.response?.data?.code === 'AUTH_001' ||
      error.response?.data?.code === 'AUTH_002' ||
      error.response?.data?.code === 'AUTH_004'
    ) {
      // 로그아웃 시키기
      console.log('잘못된 토큰');
      await deleteToken();
    }

    if (Config.ENV === 'DEVELOP') {
      console.log(error.response);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

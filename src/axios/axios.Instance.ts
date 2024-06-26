import Config from 'react-native-config';
import axios, { AxiosInstance } from 'axios';

import { refreshAccessToken } from '@server/api/member';

import { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken } from '@utils/token';

class CustomAxiosError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 로그인 한 유저가 사용하는 axiosInstance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new CustomAxiosError('토큰 에러', 'TOKEN_ERROR');
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
          throw new CustomAxiosError('토큰 에러', 'TOKEN_ERROR');
        }

        // refresh 요청
        const { tokenResponse } = await refreshAccessToken(refreshToken);

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = tokenResponse;

        await setAccessToken(newAccessToken);
        await setRefreshToken(newRefreshToken);

        // 만료때문에 반려된 api 재요청 보내기
        return axiosInstance(error.config);
      } catch (refreshTokenError) {
        throw new CustomAxiosError('토큰 에러', 'TOKEN_ERROR');
      }
    }

    // 잘못된 토큰 -> 로그 아웃
    if (
      error.response?.data?.code === 'AUTH_001' ||
      error.response?.data?.code === 'AUTH_002' ||
      error.response?.data?.code === 'AUTH_004'
    ) {
      throw new CustomAxiosError('토큰 에러', 'TOKEN_ERROR');
    }

    if (Config.ENV === 'DEVELOP') {
      console.log('==================================');
      console.log('URI:', error?.response?.config?.url);
      console.log('CODE:', error?.response?.data?.code);
      console.log('MESSAGE:', error?.response?.data?.message);
      console.log('==================================');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

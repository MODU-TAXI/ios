import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import { getAccessToken } from '@utils/token';

// 로그인 한 유저가 사용하는 axiosInstance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new Error('토큰 없음');
    }

    config.headers['Authorization'] = accessToken;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error.response.data);
  },
);

export default axiosInstance;

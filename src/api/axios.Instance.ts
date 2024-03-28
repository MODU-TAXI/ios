import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const accessToken = getAccessToken();

    // if (accessToken) {
    //   config.headers['Authorization'] = `Bearer ${accessToken}`;
    // }

    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response);
    // console.error('🌼 axiosInstance.response에서 에러 발생:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;

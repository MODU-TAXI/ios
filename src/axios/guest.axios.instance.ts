import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';

// 로그인 하지 않은 유저가 사용하는 axios
const guestAxiosInstance: AxiosInstance = axios.create({
  baseURL: Config.SERVER_URL,
  withCredentials: true,
});

guestAxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

guestAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error.response.data);
  },
);

export default guestAxiosInstance;

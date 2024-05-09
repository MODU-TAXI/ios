import Config from 'react-native-config';
import axios, { AxiosInstance } from 'axios';

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
    // 오류 처리 후 오류를 다시 throw하여 호출한 쪽에서도 처리할 수 있게 함
    return Promise.reject(err);
  },
);

guestAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 오류 처리 후 오류를 다시 throw하여 호출한 쪽에서도 처리할 수 있게 함
    return Promise.reject(error);
  },
);

export default guestAxiosInstance;

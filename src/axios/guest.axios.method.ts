/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse, AxiosRequestConfig } from 'axios';

import guestAxiosInstance from './guest.axios.instance';

export const GuestPostAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await guestAxiosInstance.post(url, data, config);
  return response;
};

export const GuestGetAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await guestAxiosInstance.get(url, config);
  return response;
};

export const GuestPatchAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await guestAxiosInstance.patch(url, data, config);
  return response;
};

export const GuestDeleteAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await guestAxiosInstance.delete(url, config);
  return response;
};

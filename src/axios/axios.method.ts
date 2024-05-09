/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse, AxiosRequestConfig } from 'axios';

import axiosInstance from '@axios/axios.Instance';

export const PostAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.post(url, data, config);
  return response;
};

export const GetAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.get(url, config);
  return response;
};

export const PatchAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.patch(url, data, config);
  return response;
};

export const DeleteAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.delete(url, config);
  return response;
};

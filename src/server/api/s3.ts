import { PostAxiosInstance } from '@axios/axios.method';

import { s3Response } from '@server/responseTypes/s3';

// [이미지 업로드] /api/s3
export const uploadImage = async (data: FormData): Promise<s3Response> => {
  const response = await PostAxiosInstance<s3Response>('/api/s3', data);

  return response.data;
};

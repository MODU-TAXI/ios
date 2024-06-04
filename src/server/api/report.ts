import { PostAxiosInstance } from '@axios/axios.method';

import { PostReportRequest } from '@server/requestTypes/report';
import { PostReportResponse } from '@server/responseTypes/report';

// [신고하기] /api/reports
export const report = async (data: PostReportRequest): Promise<PostReportResponse> => {
  const response = await PostAxiosInstance<PostReportResponse>('/api/reports', data);

  return response.data;
};

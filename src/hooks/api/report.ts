import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { report } from '@server/api/report';
import { PostReportRequest } from '@server/requestTypes/report';
import { PostReportResponse } from '@server/responseTypes/report';

import { ErrorToastMessage } from '@utils/toastMessage';

// 신고하기ㄴ
export const useReport = (): UseMutationResult<PostReportResponse, void, PostReportRequest> => {
  return useMutation({
    mutationFn: async (postReportRequest: PostReportRequest) => report(postReportRequest),
    onError: (error) => {
      ErrorToastMessage('신고에 실패하였습니다.');
    },
  });
};

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { survey } from '@server/api/onboarding';
import { SurveyRequest } from '@server/resquestTypes/onboarding';
import { ErrorToastMessage } from '@utils/toastMessage';

// 카카오 로그인
export const useSurvey = (): UseMutationResult<number, void, SurveyRequest> => {
  return useMutation({
    mutationFn: (surveyRequest: SurveyRequest) => survey(surveyRequest),

    onError: (error: any) => {
      ErrorToastMessage('오류가 발생했습니다. 다시 시도해주세요');
    },
  });
};

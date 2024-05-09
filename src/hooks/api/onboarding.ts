
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { survey } from '@server/api/onboarding';
import { SurveyRequest } from '@server/requestTypes/onboarding';
import { onBoardingErrorHandler } from '@server/errorHandler/onBoarding';

// 카카오 로그인
export const useSurvey = (): UseMutationResult<number, void, SurveyRequest> => {
  return useMutation({
    mutationFn: (surveyRequest: SurveyRequest) => survey(surveyRequest),

    onError: (error: any) => {
      onBoardingErrorHandler(error);
    },
  });
};

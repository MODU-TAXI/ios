import { useRecoilState } from 'recoil';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { IsLoggedInRecoil } from '@recoil/type';
import { isLoggedInRecoilState } from '@recoil/recoil';

import { survey } from '@server/api/onboarding';
import { SurveyRequest } from '@server/requestTypes/onboarding';
import { mutateErrorHandler } from '@server/errorHandler/mutateErrorHandler';

// 카카오 로그인
export const useSurvey = (): UseMutationResult<number, void, SurveyRequest> => {
  const [, setIsLoggedInRecoil] = useRecoilState<IsLoggedInRecoil>(isLoggedInRecoilState);

  return useMutation({
    mutationFn: (surveyRequest: SurveyRequest) => survey(surveyRequest),

    onError: (error: any) => {
      mutateErrorHandler(error, setIsLoggedInRecoil);
    },
  });
};

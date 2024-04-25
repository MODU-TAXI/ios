import { PostAxiosInstance } from '@axios/axios.method';
import { SurveyResponse } from '@server/responseTypes/onboarding';
import { SurveyRequest } from '@server/resquestTypes/onboarding';

// [설문조사] /api/onboardings
export const survey = async (data: SurveyRequest): Promise<SurveyResponse> => {
  const response = await PostAxiosInstance<SurveyResponse>(
    '/api/onboardings',
    data,
  );

  return response.data;
};

// [설문조사] /api/onboardings
export interface SurveyRequest {
  questionId: number;
  answer1?: boolean;
  answer2?: boolean;
  answer3?: boolean;
  etc: boolean;
  etcContent?: string;
}

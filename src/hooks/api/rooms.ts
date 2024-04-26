import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { createMatch } from '@server/api/room';
import { CreateMatchRequest } from '@server/requestTypes/room';
import { ErrorToastMessage, InfoToastMessage } from '@utils/toastMessage';

// 매칭 팟 생성
export const useCreateMatch = (): UseMutationResult<
  Error,
  void,
  CreateMatchRequest,
  unknown
> => {
  return useMutation({
    mutationFn: (createMatchRequest: CreateMatchRequest) =>
      createMatch(createMatchRequest),
    onSuccess: async () => {
      InfoToastMessage('파티 생성 성공!');
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

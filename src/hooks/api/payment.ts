import { useMutation, useSuspenseQuery, useSuspenseQueries } from '@tanstack/react-query';

import { PaymentRequest } from '@server/requestTypes/payment';
import { payment, getPayment, completePayment, getPaymentMembers } from '@server/api/payment';

import { ErrorToastMessage } from '@utils/toastMessage';

// 정산 정보 조회
export const useGetPayment = (roomId: number) => {
  const { data: payment, refetch: getPaymentRefetch } = useSuspenseQuery({
    queryKey: [`/api/payment-rooms`, roomId],
    queryFn: async () => getPayment(roomId),
  });

  return { payment, getPaymentRefetch };
};

// 정산 멤버 현황 조회
export const useGetPaymentMembers = (roomId: number) => {
  const { data: paymentMembers, refetch: getPaymentMembersRefetch } = useSuspenseQuery({
    queryKey: [`/api/payment-members`, roomId],
    queryFn: async () => getPaymentMembers(roomId),
  });

  return { paymentMembers, getPaymentMembersRefetch };
};

// 정산 정보 Detail 조회
export const useGetPaymentDetail = (roomId: number) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: [`/api/payment-rooms`, roomId],
        queryFn: async () => getPayment(roomId),
      },
      {
        queryKey: [`/api/payment-members`, roomId],
        queryFn: async () => getPaymentMembers(roomId),
      },
    ],
    combine: (results) => {
      return {
        payment: results[0].data,
        paymentMembers: results[1].data,
        getPaymentMembersRefetch: results[1].refetch,
      };
    },
  });
};

// 정산 요청
export const usePayment = () => {
  return useMutation({
    mutationFn: (paymentRequest: PaymentRequest) => payment(paymentRequest),

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

// 정산 완료
export const useCompletePayment = (roomId: number) => {
  return useMutation({
    mutationFn: () => completePayment(roomId),

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        return ErrorToastMessage(error.response.data.message);
      }
    },
  });
};

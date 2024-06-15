import {
  GetAxiosInstance,
  PostAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';

import { PaymentRequest } from '@server/requestTypes/payment';
import {
  PaymentResponse,
  GetPaymentResponse,
  CompletePaymentResponse,
  GetPaymentMembersResponse,
} from '@server/responseTypes/payment';

// [정산 정보 조회] /api/payment-rooms
export const getPayment = async (roomId: number): Promise<GetPaymentResponse> => {
  const response = await GetAxiosInstance<GetPaymentResponse>(
    `/api/payment-rooms?roomId=${roomId}`,
  );

  return response.data;
};

// [정산 요청] /api/payment-rooms
export const payment = async (data: PaymentRequest): Promise<PaymentResponse> => {
  const response = await PostAxiosInstance<PaymentResponse>(`/api/payment-rooms`, data);

  return response.data;
};

// [정산 멤버 현황 조회] /api/payment-members
export const getPaymentMembers = async (roomId: number): Promise<GetPaymentMembersResponse> => {
  const response = await GetAxiosInstance<GetPaymentMembersResponse>(
    `/api/payment-members?roomId=${roomId}`,
  );

  return response.data;
};

// [정산 완료] /api/payment-members
export const completePayment = async (roomId: number): Promise<CompletePaymentResponse> => {
  const response = await PatchAxiosInstance<CompletePaymentResponse>(`/api/payment-members`);

  return response.data;
};

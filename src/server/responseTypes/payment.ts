import { PaymentUser } from '@type/entity/user';

// [정산 정보 조회] /api/payment-rooms
export interface GetPaymentResponse {
  accountNumber: string;
  bank: string;
  totalCharge: number;
  status: 'COMPLETE' | 'INCOMPLETE';
}

// [정산 요청] /api/payment-rooms
export interface PaymentResponse {
  paymentRoomId: number;
}

// [정산 멤버 현황 조회] /api/payment-members
export interface GetPaymentMembersResponse {
  participantList: PaymentUser[];
}

// [정산 완료] /api/payment-members
export interface CompletePaymentResponse {
  updated: boolean;
}

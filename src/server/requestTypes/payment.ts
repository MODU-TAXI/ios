// [정산 요청] /api/payment-rooms
export interface PaymentRequest {
  roomId: number;
  accountId: number;
  totalCharge: number;
  participantList: {
    id: number;
  }[];
  nonParticipantList: {
    id: number;
  }[];
}

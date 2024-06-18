import { PaymentUser } from './user';

export type HistoryPreview = {
  historyId: number;
  departureTime: Date;
  departureName: string;
  arrivalName: string;
  portionCharge: number;
};

export type History = {
  managerId: number;
  historyId: number;
  roomId: number;
  departureTime: Date;
  departureName: string;
  arrivalName: string;
  totalCharge: number;
  portionCharge: number;
  paymentMemberListResponse: {
    participantList: PaymentUser[];
  };
};

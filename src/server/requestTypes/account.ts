// [계좌 등록] /api/accounts
export interface RegisterAccountRequest {
  ownerName: string;
  accountNumber: string;
  bank: string;
}

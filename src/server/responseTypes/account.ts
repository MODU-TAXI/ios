import { Account } from '@type/entity/account';

// [계좌 목록 조회] /api/accounts
export interface GetAccountResponse {
  accounts: Account[];
}

// [계좌 등록] /api/accounts
export interface RegisterAccountResponse {
  id: number;
  accountNumber: string;
  bank: string;
}

// [계좌 삭제] /api/accounts
export interface DeleteAccountResponse {
  success: boolean;
}

import { Bank } from '@type/entity/account';
import { UserPreview } from '@type/entity/user';

export type SettlementRecoil = {
  name: string;
  account: string;
  accountId: number;
  bank: Bank;
  amount: string;
  users: UserPreview[];
};
